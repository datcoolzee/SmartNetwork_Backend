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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tableConfigs = require('../Configs/tableConfigs');

var _tableConfigs2 = _interopRequireDefault(_tableConfigs);

var _paths = require('../paths');

var _paths2 = _interopRequireDefault(_paths);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routersRouter = _express2.default.Router();

routersRouter.route('/').post(function checkJSONValues(req, res, next) {
	var router = req.body;
	var router_schema = _tableConfigs2.default.router_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(router, router_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postRouter(req, res, next) {
	var router = req.body;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		database.insertOne('routers', router, res).then(function () {
			console.log('success');
		}).catch(function (err) {
			console.log(err);
		});
		database.close();
	});
}).get(function (req, res, next) {
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var routerCollection = database.db.collection('routers');

		routerCollection.find().toArray(function (err, docs) {
			res.json(docs);
			res.status(200);
			database.close();
		});
	}, function (err) {
		throw "Failed to connect to the database: " + err;
	});
});

routersRouter.route(_paths2.default.routerByMacAddress).get(function (req, res, next) {
	var mac_address = req.params.mac_address;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var routerCollection = database.db.collection('routers');

		// find router in routers db according to existing mac_address field and value from req 
		routerCollection.findOne({ "mac_address": { $eq: mac_address } }).then(function (router) {
			if (router) {
				res.status(200);
				res.json(router);
			} else {
				// 404 indicates that the data doesnt exist in the database
				res.status(404).send("Router with MAC Address " + mac_address + " could not be found");
			}
		}).catch(function (err) {
			res.status(500).send("Server Error: Failed to GET " + err);
		});
	}, function (err) {
		throw "Failed to connect to the database: " + err;
	});
});

exports.default = routersRouter;