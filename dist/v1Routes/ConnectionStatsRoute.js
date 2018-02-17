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

var connectionStatsRouter = _express2.default.Router();

connectionStatsRouter.route('/').post(function checkJSONValues(req, res, next) {
	var connection_statistic = req.body;
	var conn_stat_schema = _tableConfigs2.default.conn_stat_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(connection_statistic, conn_stat_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postConnectionStat(req, res, next) {
	var conn_stat = req.body;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		database.insertOne('connection-statistics', conn_stat, res).then(function () {
			console.log('success');
			database.close();
		}).catch(function (err) {
			console.log('error ' + err);
			database.close();
		});
	});
}).get(function (req, res, next) {
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var connStatsCollection = database.db.collection('connection-statistics');

		connStatsCollection.find().toArray(function (err, docs) {
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
		database.close();
	});
});

exports.default = connectionStatsRouter;