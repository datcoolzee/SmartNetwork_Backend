import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';
import paths from '../paths';

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
			res.status(200).send("Heatmap added to database")
		});

export default heatmapsRouter