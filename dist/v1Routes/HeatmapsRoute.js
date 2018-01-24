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

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var heatmapsRouter = _express2.default.Router();

heatmapsRouter.route('/').post(function checkJSONValues(req, res, next) {
	var heatmap = req.body;
	var heatmap_schema = _tableConfigs2.default.heatmap_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(heatmap, heatmap_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postHeatmap(req, res, next) {
	var heatmap = req.body;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		database.insertOne('heatmaps', heatmap, res).then(function () {
			console.log("success");
		}).catch(function (err) {
			console.log('error ' + err);
		});
		database.close();
	});
}).get(function (req, res, next) {
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var heatmapsCollection = database.db.collection('heatmaps');

		heatmapsCollection.find().toArray(function (err, docs) {
			if (!err) {
				res.json(docs);
				res.status(200);
			} else {
				res.status(500).send("Internal server error");
			}
			database.close();
		});
	}, function (err) {
		throw "Failed to connect to the database: " + err;
	});
});

exports.default = heatmapsRouter;