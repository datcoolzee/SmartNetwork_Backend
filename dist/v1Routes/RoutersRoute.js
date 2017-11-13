'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonValidation = require('json-validation');

var _jsonValidation2 = _interopRequireDefault(_jsonValidation);

var _tableConfigs = require('../Configs/tableConfigs');

var _tableConfigs2 = _interopRequireDefault(_tableConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routersRouter = _express2.default.Router();

routersRouter.route('/').post(function checkJSONValues(req, res, next) {
	var router = req.body;
	var router_schema = _tableConfigs2.default.router_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(router, router_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Router added to database");
});

exports.default = routersRouter;