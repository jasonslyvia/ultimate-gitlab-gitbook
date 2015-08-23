'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webhook = require('./webhook');

var _webhook2 = _interopRequireDefault(_webhook);

var _gitbook = require('./gitbook');

var logStream = _fs2['default'].createWriteStream(__dirname + '/access.log', { flags: 'a' });

var app = (0, _express2['default'])();

// Logging
app.use((0, _morgan2['default'])('combined', { stream: logStream }));

// Parse request body
app.use(_bodyParser2['default'].json());

// Response to webhook
app.post('/', function (req, res) {
  res.sendStatus(200);

  (0, _webhook2['default'])(req.body, {}).then(_gitbook.compileGitbook);
});

app.listen(5823, function () {
  console.log('App listening on 5823');
});