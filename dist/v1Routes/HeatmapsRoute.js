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

var _paths = require('../paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var heatmapsRouter = _express2.default.Router();

heatmapsRouter.route('/').post(function checkJSONValues(req, res, next) {
	var heatmap = req.body;
	var heatmap_schema = _tableConfigs2.default.heatmap_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(heatmap, heatmap_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postHeatmap(req, res, next) {
	res.status(200).send("Heatmap added to database");
});

exports.default = heatmapsRouter;