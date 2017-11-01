var express = require('express');
var app = express();

//check for port provided by env
var port = process.env.PORT || 3000;

var welcomeMessage = { message: 'Welcome to SmartNet' };

app.get('/', function (req, res) {
  res.json(welcomeMessage);
});

app.listen(port, function () {
  console.log('Server listening on port ' + port + '!');
});