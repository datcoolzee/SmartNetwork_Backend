import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from '../tableConfigs';

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

		function postAddress(req, res, next) {
			res.status(200).send("Router added to database")
		});

export default routersRouter