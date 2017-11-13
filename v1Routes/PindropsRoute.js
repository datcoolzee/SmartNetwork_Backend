import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../Configs/tableConfigs';

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

		function postAddress(req, res, next) {
			res.status(200).send("Pindrop added to database")
		});

export default pindropsRouter