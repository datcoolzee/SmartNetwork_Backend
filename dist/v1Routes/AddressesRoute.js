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

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _paths = require('../paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addressesRouter = _express2.default.Router();

addressesRouter.route('/').post(function checkJSONValues(req, res, next) {
	var address = req.body;
	var address_schema = _tableConfigs2.default.address_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(address, address_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	var address = req.body;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		database.insertOne('addresses', address, res).then(function () {
			console.log('success');
			database.close();
		}).catch(function (err) {
			console.log(err);
			database.close();
		});
	});
}).get(function (req, res, next) {
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var addressesCollection = database.db.collection('addresses');

		addressesCollection.find().toArray(function (err, docs) {
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
}).patch(function checkJSONValues(req, res, next) {
	var router = req.body;
	var router_schema = _tableConfigs2.default.address_patch_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(router, router_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function (req, res, next) {
	var mac_address = req.body.mac_address;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var filter = {};
		filter["mac_address"] = { $eq: mac_address };

		database.findAndUpdate('addresses', req, res, filter).then(function () {
			console.log('success');
			database.close();
		}).catch(function (err) {
			console.log(err);
			database.close();
		});
	}, function (err) {
		throw "Failed to connect to the database: " + err;
		database.close();
	});
});
addressesRouter.route(_paths2.default.addressByMacAddress).get(function (req, res, next) {
	var mac_address = req.params.mac_address;
	var database = new _db2.default();

	database.connect(_paths2.default.mongodb).then(function () {
		var addressCollection = database.db.collection('addresses');

		// find address in addresses db according to existing mac_address field and value from req 
		addressCollection.findOne({ "mac_address": { $eq: mac_address } }).then(function (address) {
			if (address) {
				res.status(200);
				res.json(address);
			} else {
				// 404 indicates that the data doesnt exist in the database
				res.status(404).send("Address with MAC Address " + mac_address + " could not be found");
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

exports.default = addressesRouter;