import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import assert from 'assert'
import tableConfigs from '../Configs/tableConfigs';
import db from '../db';

var routersRouter = express.Router();

routersRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var router = req.body;
			var router_schema = tableConfigs.router_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(router, router_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postRouter(req, res, next) {
			var router = req.body;
			var database = new db();

			database.connect('mongodb://localhost:27017')
				.then(
					function(){
						var routerCollection = database.db.collection('routers');
						routerCollection.insertOne(router);

						// have timeout and fetch document to ensure it has been properly inserted
						setTimeout(function() {

						    // Fetch the document
						    routerCollection.findOne(router, function(err, item) {
						        assert.equal(null, err);
						        assert.equal(router.mac_address, item.mac_address);
						        database.close();
						    })
						  }, 100);
					},
					function(err) {
						// DB connection failed, add context to the error and throw it (it will be
						// converted to a rejected promise
						throw("Failed to connect to the database: " + err);
					})

			res.status(200).send("Router added to database")
		})
	.get(
		function(req, res, next) {
			var database = new db();

			database.connect('mongodb://localhost:27017')
				.then(
					function(){
						var routerCollection = database.db.collection('routers');

						routerCollection.find().toArray(function(err, docs){
							res.json(docs);

							database.close();
						});
					},
					function(err){
						throw("Failed to connect to the database: " + err);
					})
			res.status(200);
	});

routersRouter.route('/:routerId')
	.get(
		function getRouterById(){
			//TODO
		})

export default routersRouter