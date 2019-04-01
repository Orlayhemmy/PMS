'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _state = require('./controller/state');

var _city = require('./controller/city');

var _location = require('./middleware/location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/states').post(_location.validatePost, _state.addStates).get(_state.fetchAllState);

router.route('/states/:id').delete(_state.deleteState);

router.route('/cities').post(_location.validatePost, _city.addCities).get(_city.fetchAllCities);

router.route('/cities/:id').put(_location.validateUpdateData, _city.updateCityData).delete(_city.deleteCity);

exports.default = router;