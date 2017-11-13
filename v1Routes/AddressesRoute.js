import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../tableConfigs';

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
			res.status(200).send("Address added to database")
		});

export default addressesRouter