'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCity = exports.updateCityData = exports.fetchAllCities = exports.addCities = undefined;

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

var updateStateData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id, male, female) {
    var checkState, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            checkState = '\n  UPDATE states AS s\n  SET male = c.sumMale + $2, female=c.sumFemale + $3\n  FROM (\n    SELECT id, SUM(female) sumFemale, SUM(male) sumMale FROM states WHERE id=$1 GROUP BY id\n  ) c\n  WHERE c.id = s.id';
            _context.next = 3;
            return _db2.default.query(checkState, [id, male, female]);

          case 3:
            result = _context.sent;

            if (!(result.command === 'UPDATE')) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', true);

          case 6:
            return _context.abrupt('return', false);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateStateData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var addCities = exports.addCities = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref2, res) {
    var _ref2$body = _ref2.body,
        name = _ref2$body.name,
        male = _ref2$body.male,
        female = _ref2$body.female,
        state_id = _ref2$body.state_id;

    var checkCity, query, values, check, _ref4, rows, err, isUpdated;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            checkCity = 'SELECT * FROM cities WHERE name=$1';
            query = 'INSERT INTO\n    cities(id, name, male, female, state_id, created_date, modified_date)\n    VALUES($1, $2, $3, $4, $5, $6, $7)\n    returning *\n  ';
            values = [(0, _uuid2.default)(), name, male = male || 0, female = female || 0, state_id, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
            _context2.next = 5;
            return _db2.default.query(checkCity, [name]);

          case 5:
            check = _context2.sent;

            if (!check.rows.length) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return', res.status(400).send({ message: name + ' exists already' }));

          case 8:
            _context2.next = 10;
            return _db2.default.query(query, values);

          case 10:
            _ref4 = _context2.sent;
            rows = _ref4.rows;
            err = _ref4.err;

            if (!rows[0]) {
              _context2.next = 19;
              break;
            }

            _context2.next = 16;
            return updateStateData(state_id, male, female);

          case 16:
            isUpdated = _context2.sent;

            if (!isUpdated) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt('return', res.status(201).send({ message: name + ' added successfully', data: rows[0] }));

          case 19:
            return _context2.abrupt('return', res.status(500).send({ err: err, message: 'Request cannot be completed at the moment' }));

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addCities(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var fetchAllCities = exports.fetchAllCities = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var query, _ref6, rows, err;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = 'SELECT * FROM cities';
            _context3.next = 3;
            return _db2.default.query(query);

          case 3:
            _ref6 = _context3.sent;
            rows = _ref6.rows;
            err = _ref6.err;

            if (!rows) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt('return', res.status(200).send({ data: rows }));

          case 8:
            return _context3.abrupt('return', res.status(500).send({ err: err, message: 'Request cannot be completed at the moment' }));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function fetchAllCities(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var updateCityData = exports.updateCityData = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref7, res) {
    var id = _ref7.params.id,
        _ref7$body = _ref7.body,
        name = _ref7$body.name,
        male = _ref7$body.male,
        female = _ref7$body.female;

    var getDataquery, _ref9, rows, err, query, values, result, isUpdated;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            getDataquery = 'SELECT * FROM cities where id = $1';
            _context4.next = 3;
            return _db2.default.query(getDataquery, [id]);

          case 3:
            _ref9 = _context4.sent;
            rows = _ref9.rows;
            err = _ref9.err;
            query = 'UPDATE cities SET name=$1, male=$2, female=$3, modified_date=$4 WHERE id=$5';
            values = [name = name || rows[0].name, male = male || rows[0].male, female = female || rows[0].female, (0, _moment2.default)(new Date()), id];
            _context4.next = 10;
            return _db2.default.query(query, values);

          case 10:
            result = _context4.sent;

            if (!result.rowCount) {
              _context4.next = 17;
              break;
            }

            _context4.next = 14;
            return updateStateData(rows[0].state_id, male, female);

          case 14:
            isUpdated = _context4.sent;

            if (!isUpdated) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt('return', res.status(200).send({ message: 'Update Successful' }));

          case 17:
            return _context4.abrupt('return', res.status(500).send({ message: 'Network Error' }));

          case 18:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function updateCityData(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();

var deleteCity = exports.deleteCity = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref10, res) {
    var id = _ref10.params.id;

    var query, _ref12, rows, err;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = 'DELETE FROM\n    cities WHERE id=$1 returning *\n  ';
            _context5.next = 3;
            return _db2.default.query(query, [id]);

          case 3:
            _ref12 = _context5.sent;
            rows = _ref12.rows;
            err = _ref12.err;

            if (!rows[0]) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt('return', res.status(200).send({
              message: rows[0].name + ' is deleted successfully'
            }));

          case 8:
            return _context5.abrupt('return', res.status(404).send({
              message: 'The city cannot be found'
            }));

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function deleteCity(_x10, _x11) {
    return _ref11.apply(this, arguments);
  };
}();