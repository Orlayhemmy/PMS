'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteState = exports.fetchAllState = exports.addStates = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addStates = exports.addStates = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref, res) {
    var _ref$body = _ref.body,
        name = _ref$body.name,
        male = _ref$body.male,
        female = _ref$body.female;

    var checkState, query, values, check, _ref3, rows, err;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            checkState = 'SELECT * FROM states WHERE name=$1';
            query = 'INSERT INTO\n    states(id, name, male, female, created_date, modified_date)\n    VALUES($1, $2, $3, $4, $5, $6)\n    returning *\n  ';
            values = [(0, _uuid2.default)(), name, male = male || 0, female = female || 0, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
            _context.next = 5;
            return _db2.default.query(checkState, [name]);

          case 5:
            check = _context.sent;

            if (!check.rows.length) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', res.status(400).send({ message: name + ' state exists already' }));

          case 8:
            _context.next = 10;
            return _db2.default.query(query, values);

          case 10:
            _ref3 = _context.sent;
            rows = _ref3.rows;
            err = _ref3.err;

            if (!rows[0]) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return', res.status(201).send({ message: name + ' added successfully', data: rows[0] }));

          case 15:
            return _context.abrupt('return', res.status(500).send({ err: err, message: 'Request cannot be completed at the moment' }));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addStates(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var fetchAllState = exports.fetchAllState = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var query, _ref5, rows, err, obj;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = 'SELECT s.id, s.name as state, c.name as city, s.male as state_male, s.female as state_female, c.male as city_male, c.female as city_female FROM states as s LEFT JOIN cities as c ON s.id = c.state_id';
            _context2.next = 3;
            return _db2.default.query(query);

          case 3:
            _ref5 = _context2.sent;
            rows = _ref5.rows;
            err = _ref5.err;
            obj = {};

            if (!rows) {
              _context2.next = 10;
              break;
            }

            rows.forEach(function (element) {
              var state = element.state,
                  id = element.id,
                  city = element.city,
                  state_male = element.state_male,
                  state_female = element.state_female,
                  city_male = element.city_male,
                  city_female = element.city_female;


              obj[state] = obj[element.state] ? [].concat((0, _toConsumableArray3.default)(obj[element.state]), [{
                city: city,
                state_id: id,
                male: city_male,
                female: city_female
              }]) : [{
                state_id: id,
                city: city || state,
                male: city_male || state_male,
                female: city_female || state_female
              }];
            });
            return _context2.abrupt('return', res.status(200).send({ data: obj }));

          case 10:
            return _context2.abrupt('return', res.status(500).send({ err: err, message: 'Request cannot be completed at the moment' }));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchAllState(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteState = exports.deleteState = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref6, res) {
    var id = _ref6.params.id;

    var queryData, _ref8, rows, err, deleteQuery, result;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            queryData = 'SELECT * FROM\n    cities WHERE state_id=$1\n  ';
            _context3.next = 3;
            return _db2.default.query(queryData, [id]);

          case 3:
            _ref8 = _context3.sent;
            rows = _ref8.rows;
            err = _ref8.err;

            if (!rows[0]) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt('return', res.status(400).send({
              message: 'The state has sub-locations and cannot be deleted'
            }));

          case 8:
            deleteQuery = 'DELETE FROM\n  states WHERE id=$1 returning *\n  ';
            _context3.next = 11;
            return _db2.default.query(deleteQuery, [id]);

          case 11:
            result = _context3.sent;

            if (!result.rows[0]) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt('return', res.status(200).send({
              message: result.rows[0].name + ' is deleted successfully'
            }));

          case 14:
            return _context3.abrupt('return', res.status(404).send({
              message: 'The state cannot be found'
            }));

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function deleteState(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();