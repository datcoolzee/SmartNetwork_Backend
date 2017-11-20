'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _v1Routes = require('./v1Routes');

var _v1Routes2 = _interopRequireDefault(_v1Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//check for port provided by env
var port = process.env.PORT || 8080;

/*----------------ADD MIDDLEWARE-----------------*/
// set up body parser for app to extract json from buffer stream 
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use(_bodyParser2.default.json());

/*----------------ADD Routers-------------------*/
app.use('/smartrg/v1', _v1Routes2.default);

/*----------------START LISTENING---------------*/
app.listen(port, function () {
  console.log('Server listening on port ' + port + '!');
});