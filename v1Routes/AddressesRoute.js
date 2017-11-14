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
						var addressesCollection = database.db.collection('addresses');

						addressesCollection.insertOne(address, function(err, address){
							if(err){
								res.status(500).send("Failed to add record to database " + err);
							}
							else if(address.insertedCount === 1){
								//success send back a status code and maybe the id of the object
								res.status(200).send("Address added to database");
							}
							else{
								res.status(500).send("Failed to add record to database");
							}

							database.close();
						});
					},
					(err) => {
						// DB connection failed, add context to the error and throw it (it will be
						// converted to a rejected promise
						throw("Failed to connect to the database: " + err);
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
					}
				)
		})

export default addressesRouter