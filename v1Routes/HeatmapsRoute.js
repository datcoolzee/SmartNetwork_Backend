import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';
import paths from '../paths';
import db from '../db';
import asyncMap from '../helper';
var ObjectId = require('mongodb').ObjectId;

var heatmapsRouter = express.Router();

heatmapsRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var heatmap = req.body;
			var heatmap_schema = tableConfigs.heatmap_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(heatmap, heatmap_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postHeatmap(req, res, next) {
			var heatmap = req.body;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						database.insertOne('heatmaps', heatmap, res)
							.then(
								() => {
									console.log("success");
									database.close();
								})
							.catch(
								(err) => {
									console.log('error ' + err);
									database.close();
								})
					}
				)
		})
	.get(
		(req, res, next) => {
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						var heatmapsCollection = database.db.collection('heatmaps');

						heatmapsCollection.find().toArray(function(err, docs){
							if(!err){
								res.json(docs);
								res.status(200);
							}
							else{
								res.status(500).send("Internal server error");
							}
							database.close();
						});
					},
					(err) => {
						throw("Failed to connect to the database: " + err);
						database.close();
					}
				)
		});
heatmapsRouter.route(paths.heatmapByMacAddress)
	.get(function(req, res, next){
		var mac_address = req.params.mac_address;
		var database = new db();

		database.connect(paths.mongodb)
			.then(
				function(){
					var heatmapsCollection = database.db.collection('heatmaps');

					// find heatmap in heatmaps db according to existing mac_address field and value from req 
					heatmapsCollection.find({ "mac_address" : { $eq : mac_address }}).toArray()
						.then((heatmaps) => {
							if(heatmaps && heatmaps.length > 0){
								res.status(200);
								res.json(heatmaps);
							}
							else{
								// 404 indicates that the data doesnt exist in the database
								res.status(404).send("Heatmap with MAC Address " + mac_address + " could not be found");
							}
							database.close();
						})
						.catch((err) => {
							res.status(500).send("Server Error: Failed to GET " + err);
							database.close();
						});
				},
				function(err){
					throw("Failed to connect to the database: " + err);
					database.close();
				}
			)
	});
heatmapsRouter.route(paths.heatmapByHeatmapId)
	.get(function(req, res, next){
		var heatmapId = req.params.heatmap_id;
		var database = new db();

		database.connect(paths.mongodb)
			.then(
				function(){
					var heatmapsCollection = database.db.collection('heatmaps');

					heatmapsCollection.findOne({"_id" : { $eq : ObjectId.isValid(heatmapId) ? new ObjectId(heatmapId) : null }})
						.then((heatmap) => {
							if(!heatmap){
								throw("Invalid Id: Bad Request");
							}

							var pindropsCollection = database.db.collection('pindrops');

							pindropsCollection.find({"heatmap_id": { $eq : heatmapId }}).toArray(function(err, docs){
								if(!err){
									var fullHeatmap = {
										...heatmap,
										pindrops: docs

									};

									res.json(fullHeatmap);
									res.status(200);
								}
								else{
									res.status(500).send("Internal server error");
								}
								database.close();
							},
							function(err){
								throw("Failed to connect to the database: ");
								database.close();
							})
						})
						.catch((err) => {
							res.status(500).send(err);
							database.close();
						});					
				},
				function(err){
					res.status(500).send("Internal server error");
					database.close();
				}
			)
	});

export default heatmapsRouter