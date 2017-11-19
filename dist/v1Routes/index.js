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

var _ConnectionStatsRoute = require('./ConnectionStatsRoute');

var _ConnectionStatsRoute2 = _interopRequireDefault(_ConnectionStatsRoute);

var _paths = require('../paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*make main router for v1 api*/


/*import all routes that will be used here*/
var smartrg_V1_Router = _express2.default.Router();

var welcomeMessage = { message: 'Welcome to SmartNet' };

smartrg_V1_Router.get('/', function (req, res, next) {
	res.json(welcomeMessage);
});

smartrg_V1_Router.use(_paths2.default.heatmaps, _HeatmapsRoute2.default);
smartrg_V1_Router.use(_paths2.default.addresses, _AddressesRoute2.default);
smartrg_V1_Router.use(_paths2.default.routers, _RoutersRoute2.default);
smartrg_V1_Router.use(_paths2.default.pindrops, _PindropsRoute2.default);
smartrg_V1_Router.use(_paths2.default.connection_statistics, _ConnectionStatsRoute2.default);

exports.default = smartrg_V1_Router;