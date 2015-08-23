"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var express = _interopRequire(require("express"));

var bodyParser = _interopRequire(require("body-parser"));

var app = express();

app.use(bodyParser.json());

app.post("/", function (req, res) {
  console.log(req.body);

  res.sendStatus(200);
});

app.listen(5823, function () {
  console.log("App listening on 5823");
});