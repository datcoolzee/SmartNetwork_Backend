'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _tableConfigs = require('./tableConfigs');

var _tableConfigs2 = _interopRequireDefault(_tableConfigs);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var smartrg_V1_Router = _express2.default.Router();

//check for port provided by env
var port = process.env.PORT || 3000;

// set up body parser for app to extract json from buffer stream
smartrg_V1_Router.use(_bodyParser2.default.urlencoded({
	extended: true
}));
smartrg_V1_Router.use(_bodyParser2.default.json());

var welcomeMessage = { message: 'Welcome to SmartNet' };

//root path
smartrg_V1_Router.get('/', function (req, res, next) {
	res.json(welcomeMessage);
});

smartrg_V1_Router.route('/heatmaps').post(function checkJSONValues(req, res, next) {
	console.log(req.body);
	next();
}, function postHeatmap(req, res, next) {
	res.status(200).send("Heatmap added to database");
});

smartrg_V1_Router.route('/address').post(function checkJSONValues(req, res, next) {
	var address = req.body;
	var emptyFields = [];

	console.log(req.body);

	_tableConfigs2.default.address_fields.forEach(function (field) {
		if (_lodash2.default.isEmpty(address[field])) {
			emptyFields.push(field);
		}
	});

	emptyFields.length !== 0 ? res.status(400).send("Missing fields: " + emptyFields.join(", ")) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Address added to database");
});

//telling main application to route all to smartrg/v1
app.use('/smartrg/v1', smartrg_V1_Router);

app.listen(port, function () {
	console.log('Server listening on port ' + port + '!');
});