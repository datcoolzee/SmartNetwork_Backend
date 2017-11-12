import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import tableConfigs from './tableConfigs';
import db from './db';

var app = express();
var smartrg_V1_Router = express.Router();

//check for port provided by env
var port = process.env.PORT || 3000;

// set up body parser for app to extract json from buffer stream
smartrg_V1_Router.use(bodyParser.urlencoded({
	extended: true
}));
smartrg_V1_Router.use(bodyParser.json());

var welcomeMessage = { message: 'Welcome to SmartNet' };

//root path
smartrg_V1_Router.get('/', function(req, res, next){
	res.json(welcomeMessage);
});

smartrg_V1_Router.route('/heatmaps')
	.post(
		function checkJSONValues(req, res, next) {
			console.log(req.body);
			next();
		},	
		function postHeatmap(req, res, next) {
			res.status(200).send("Heatmap added to database")
		});

smartrg_V1_Router.route('/addresses')
	.post(
		function checkJSONValues(req, res, next) {
			var address = req.body;
			var address_schema = tableConfigs.address_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(address, address_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	
		
		function postAddress(req, res, next) {
			res.status(200).send("Address added to database")
		});

//telling main application to route all to smartrg/v1
app.use('/smartrg/v1', smartrg_V1_Router);

app.listen(port, function () {
  console.log('Server listening on port ' + port + '!');
});