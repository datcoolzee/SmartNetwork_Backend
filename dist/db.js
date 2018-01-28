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

	this.insertOne = function (collectionName, req, res) {
		var self = _this;

		return new Promise(function (resolve, reject) {
			self.db.collection(collectionName, function (err, collection) {
				if (err) {
					console.log("Could not access collection: " + err.message);
					reject(err.message);
				} else {
					collection.insertOne(req, function (err, req) {
						if (err) {
							res.status(500).send("Failed to add record to database " + err);
							reject(err.message);
						} else if (req.insertedCount === 1) {
							// success send back a status code and maybe the id of the object
							res.status(200).json({
								message: "Added to " + collectionName + " database",
								data: {
									_id: req.insertedId
								}
							});
							resolve();
						} else {
							res.status(500).send("Failed to add record to database");
							reject(err.message);
						}
					});
				}
			});
		});
	};

	this.findAndUpdate = function (collectionName, req, res, filterObj) {
		var self = _this;

		return new Promise(function (resolve, reject) {
			self.db.collection(collectionName, function (err, collection) {
				if (err) {
					console.log("Could not access collection: " + err.message);
					reject(err.message);
				} else {
					collection.findOneAndUpdate(filterObj, { $set: req.body }, { returnNewDocument: true }, function (err, result) {
						if (err) {
							res.status(500).send("Failed to update record in database " + err);
							reject(err.message);
						} else if (!result.value) {
							// check if original document was returned...the value in the returned new doc will be null
							res.status(200).json({
								message: "Could not find " + collectionName + " document in database",
								data: result
							});
							resolve();
						} else {
							res.status(200).json({
								message: "Updated " + collectionName + " in database",
								data: result
							});
							resolve();
						}
					});
				}
			});
		});
	};

	this.db = null;
}

// attempts to insert data given collection and response object
;

exports.default = db;