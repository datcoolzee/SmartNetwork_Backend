import express from 'express';
import bodyParser from 'body-parser';

import v1Routes from './v1Routes';

var app = express();

//check for port provided by env
var port = process.env.PORT || 8080;

/*----------------ADD MIDDLEWARE-----------------*/
// set up body parser for app to extract json from buffer stream 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/*----------------ADD Routers-------------------*/
app.use('/smartrg/v1', v1Routes);

/*----------------START LISTENING---------------*/
app.listen(port, function () {
  console.log('Server listening on port ' + port + '!');
});