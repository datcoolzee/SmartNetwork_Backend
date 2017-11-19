import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';
import paths from '../paths';
import db from '../db';

var pindropsRouter = express.Router();

pindropsRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var pindrop = req.body;
			var pindrop_schema = tableConfigs.pindrop_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(pindrop, pindrop_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postPindrop(req, res, next) {
			var pindrop = req.body;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						database.insertOne("pindrops", pindrop, res)
						.then(
							() => {
								console.log('success');
							}
						)
						.catch(
							(err) => {
									console.log(err);
								}
							)
						database.close();
					}
				)
			res.status(200).send("Pindrop added to database")
		})
	.get(
		(req, res, next) => {
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						var pindropsCollection = database.db.collection('pindrops');

						pindropsCollection.find().toArray(function(err, docs){
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

export default pindropsRouter