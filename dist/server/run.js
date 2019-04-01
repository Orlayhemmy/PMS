'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.listen('8888', function () {
  console.log('Server started on port 8888');
});

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
  return res.status(200).send({ message: 'Welcome' });
});

exports.default = app;