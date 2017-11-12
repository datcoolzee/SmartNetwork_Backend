'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoClient = require('mongodb').MongoClient;

var db = function db() {
	var _this = this;

	_classCallCheck(this, db);

	this.connect = function (connection_string) {
		var self = _this;

		return new Promise(function (resolve, reject) {
			if (self.db) {
				resolve();
			} else {
				var _self = self;

				MongoClient.connect(connection_string).then(function (database) {
					_self.db = database;

					resolve();
				}, function (err) {
					console.log('Error connecting: ' + err.message);

					reject(err.message);
				});
			}
		});
	};

	this.close = function () {
		if (_this.db) {
			_this.db.close().then(function () {}, function (error) {
				console.log('failed to close the connection to the database: ' + error.message);
			});
		}
	};

	this.db = null;
};

exports.default = db;