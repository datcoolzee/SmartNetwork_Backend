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

var _tableConfigs = require('../tableConfigs');

var _tableConfigs2 = _interopRequireDefault(_tableConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pindropsRouter = _express2.default.Router();

pindropsRouter.route('/').post(function checkJSONValues(req, res, next) {
	var pindrop = req.body;
	var pindrop_schema = _tableConfigs2.default.pindrop_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(pindrop, pindrop_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Pindrop added to database");
});

exports.default = pindropsRouter;