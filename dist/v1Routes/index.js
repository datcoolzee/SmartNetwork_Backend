'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _HeatmapsRoute = require('./HeatmapsRoute');

var _HeatmapsRoute2 = _interopRequireDefault(_HeatmapsRoute);

var _AddressesRoute = require('./AddressesRoute');

var _AddressesRoute2 = _interopRequireDefault(_AddressesRoute);

var _RoutersRoute = require('./RoutersRoute');

var _RoutersRoute2 = _interopRequireDefault(_RoutersRoute);

var _PindropsRoute = require('./PindropsRoute');

var _PindropsRoute2 = _interopRequireDefault(_PindropsRoute);

var _connectionStatsRoute = require('./connectionStatsRoute');

var _connectionStatsRoute2 = _interopRequireDefault(_connectionStatsRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*make main router for v1 api*/
var smartrg_V1_Router = _express2.default.Router();

/*import all routes that will be used here*/


var welcomeMessage = { message: 'Welcome to SmartNet' };

smartrg_V1_Router.get('/', function (req, res, next) {
	res.json(welcomeMessage);
});

smartrg_V1_Router.use('/heatmaps', _HeatmapsRoute2.default);
smartrg_V1_Router.use('/addresses', _AddressesRoute2.default);
smartrg_V1_Router.use('/routers', _RoutersRoute2.default);
smartrg_V1_Router.use('/pindrops', _PindropsRoute2.default);
smartrg_V1_Router.use('/connection-statistics', _connectionStatsRoute2.default);

exports.default = smartrg_V1_Router;