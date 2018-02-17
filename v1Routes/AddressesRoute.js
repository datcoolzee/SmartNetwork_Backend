import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';
import db from '../db';
import paths from '../paths';

var addressesRouter = express.Router();

addressesRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var address = req.body;
			var address_schema = tableConfigs.address_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(address, address_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postAddress(req, res, next) {
			var address = req.body;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						database.insertOne('addresses', address, res)
							.then(
								() => {
									console.log('success');
									database.close();
								}
							)
							.catch(
								(err) => {
									console.log(err);
									database.close();
								}
							)
					}
				)
		})
	.get(
		(req, res, next) => {
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						var addressesCollection = database.db.collection('addresses');

						addressesCollection.find().toArray(function(err, docs){
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
		})
	.patch(
		function checkJSONValues(req, res, next){
			var router = req.body;
			var router_schema = tableConfigs.address_patch_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(router, router_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},
		function(req, res, next){
			var mac_address = req.body.mac_address;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						let filter = {};
						filter["mac_address"] = { $eq: mac_address};

						database.findAndUpdate('addresses', req, res, filter)
							.then(
								() => {
									console.log('success');
									database.close();
								})
							.catch((err) => {
								console.log(err);
								database.close();
							})		
					},
					function(err){
						throw("Failed to connect to the database: " + err);
						database.close();
					})
	})
addressesRouter.route(paths.addressByMacAddress)
	.get(
		(req, res, next) => {
			var mac_address = req.params.mac_address;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					function(){
						var addressCollection = database.db.collection('addresses');

						// find address in addresses db according to existing mac_address field and value from req 
						addressCollection.findOne({ "mac_address" : { $eq : mac_address }})
							.then((address) => {
								if(address){
									res.status(200);
									res.json(address);
								}
								else{
									// 404 indicates that the data doesnt exist in the database
									res.status(404).send("Address with MAC Address " + mac_address + " could not be found");
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
		})

export default addressesRouter