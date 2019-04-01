'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.PORT || 8888;

app.listen(port, function () {
  console.log('Server started on port 8888');
});

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
  return res.status(200).send({ message: 'Welcome' });
});

app.use('/api/v1/', _route2.default);

exports.default = app;