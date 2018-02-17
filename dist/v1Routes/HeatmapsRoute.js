'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = require('mongodb').ObjectId;

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
			database.close();
		}).catch(function (err) {
			console.log('error ' + err);
			database.close();
		});
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
		database.close();
	});
});
heatmapsRouter.route(_paths2.default.heatmapByMacAddress).get(function (req, res, next) {
	var mac_address = req.params.mac_address;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var heatmapsCollection = database.db.collection('heatmaps');

		// find heatmap in heatmaps db according to existing mac_address field and value from req 
		heatmapsCollection.find({ "mac_address": { $eq: mac_address } }).toArray().then(function (heatmaps) {
			if (heatmaps && heatmaps.length > 0) {
				res.status(200);
				res.json(heatmaps);
			} else {
				// 404 indicates that the data doesnt exist in the database
				res.status(404).send("Heatmap with MAC Address " + mac_address + " could not be found");
			}
			database.close();
		}).catch(function (err) {
			res.status(500).send("Server Error: Failed to GET " + err);
			database.close();
		});
	}, function (err) {
		throw "Failed to connect to the database: " + err;
		database.close();
	});
});
heatmapsRouter.route(_paths2.default.heatmapByHeatmapId).get(function (req, res, next) {
	var heatmapId = req.params.heatmap_id;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var heatmapsCollection = database.db.collection('heatmaps');

		heatmapsCollection.findOne({ "_id": { $eq: ObjectId.isValid(heatmapId) ? new ObjectId(heatmapId) : null } }).then(function (heatmap) {
			if (!heatmap) {
				throw "Invalid Id: Bad Request";
			}

			var pindropsCollection = database.db.collection('pindrops');

			pindropsCollection.find({ "heatmap_id": { $eq: heatmapId } }).toArray(function (err, docs) {
				if (!err) {
					var fullHeatmap = (0, _extends3.default)({}, heatmap, {
						pindrops: docs

					});

					res.json(fullHeatmap);
					res.status(200);
				} else {
					res.status(500).send("Internal server error");
				}
				database.close();
			}, function (err) {
				throw "Failed to connect to the database: ";
				database.close();
			});
		}).catch(function (err) {
			res.status(500).send(err);
			database.close();
		});
	}, function (err) {
		res.status(500).send("Internal server error");
		database.close();
	});
});

exports.default = heatmapsRouter;