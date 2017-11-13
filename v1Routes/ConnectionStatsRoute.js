import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';

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
			res.status(200).send("Connection Statistics added to database")
		});

export default connectionStatsRouter