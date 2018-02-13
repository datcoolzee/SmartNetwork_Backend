import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';
import paths from '../paths';
import db from '../db';

var connectionStatsRouter = express.Router();

connectionStatsRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var connection_statistic = req.body;
			var conn_stat_schema = tableConfigs.conn_stat_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(connection_statistic, conn_stat_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postConnectionStat(req, res, next) {
			var conn_stat = req.body;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						database.insertOne('connection-statistics', conn_stat, res)
							.then(
								() => {
									console.log('success');
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
						var connStatsCollection = database.db.collection('connection-statistics');

						connStatsCollection.find().toArray(function(err, docs){
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

export default connectionStatsRouter