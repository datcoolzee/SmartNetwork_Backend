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

	database.connect('mongodb://localhost:27017').then(function () {
		var routerCollection = database.db.collection('routers');

		routerCollection.insertOne(router, function (err, r) {
			if (err) {
				res.status(500).send("Failed to add record to database " + err);
			} else if (r.insertedCount === 1) {
				//success send back a status code and maybe the id of the object
				res.status(200).send("Router added to database");
			} else {
				res.status(500).send("Failed to add record to database");
			}
		});

		database.close();
	}, function (err) {
		// DB connection failed, add context to the error and throw it (it will be
		// converted to a rejected promise
		throw "Failed to connect to the database: " + err;
	});
}).get(function (req, res, next) {
	var database = new _db2.default();

	database.connect('mongodb://localhost:27017').then(function () {
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

routersRouter.route('/:routerId').get(function getRouterById() {
	//TODO
});

exports.default = routersRouter;