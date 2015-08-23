'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webhook = require('./webhook');

var _webhook2 = _interopRequireDefault(_webhook);

var app = (0, _express2['default'])();

app.use(_bodyParser2['default'].json());

app.post('/', function (req, res) {
  res.sendStatus(200);

  (0, _webhook2['default'])(req.body, {});
});

app.listen(5823, function () {
  console.log('App listening on 5823');
});