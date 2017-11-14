import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import assert from 'assert'
import tableConfigs from '../Configs/tableConfigs';
import db from '../db';

var routersRouter = express.Router();

routersRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var router = req.body;
			var router_schema = tableConfigs.router_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(router, router_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postRouter(req, res, next) {
			var router = req.body;
			var database = new db();

			database.connect('mongodb://localhost:27017')
				.then(
					function(){
						var routerCollection = database.db.collection('routers');

						routerCollection.insertOne(router, function(err, r){
							if(err){
								res.status(500).send("Failed to add record to database " + err);
							}
							else if(r.insertedCount === 1){
								//success send back a status code and maybe the id of the object
								res.status(200).send("Router added to database");
							}
							else{
								res.status(500).send("Failed to add record to database");
							}
						});
						
						database.close();

					},
					function(err) {
						// DB connection failed, add context to the error and throw it (it will be
						// converted to a rejected promise
						throw("Failed to connect to the database: " + err);
					})
		})
	.get(
		function(req, res, next) {
			var database = new db();

			database.connect('mongodb://localhost:27017')
				.then(
					function(){
						var routerCollection = database.db.collection('routers');

						routerCollection.find().toArray(function(err, docs){
							res.json(docs);
							res.status(200);
							database.close();
						});
					},
					function(err){
						throw("Failed to connect to the database: " + err);
					})
	});

routersRouter.route('/by-mac-address/:mac_address')
	.get(
		function(req, res, next){
			var mac_address = req.params.mac_address;
			var database = new db();

			database.connect('mongodb://localhost:27017')
				.then(
					function(){
						var routerCollection = database.db.collection('routers');

						// find router in routers db according to existing mac_address field and value from req 
						routerCollection.findOne({ "mac_address" : { $eq : mac_address }})
							.then((router) => {
								if(router){
									res.status(200);
									res.json(router);
								}
								else{
									// no 404 indicates that the data doesnt exist in the database
									res.status(404).send("Router with MAC Address " + mac_address + " could not be found");
								}
							})
							.catch((err) => {
								res.status(500).send("Server Error: Failed to GET " + err);
							});
					},
					function(err){
						throw("Failed to connect to the database: " + err);
					}
				)
		})

export default routersRouter