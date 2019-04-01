"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validatePost = exports.validatePost = function validatePost(_ref, res, next) {
  var _ref$body = _ref.body,
      male = _ref$body.male,
      female = _ref$body.female,
      name = _ref$body.name;

  var errors = {};

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!male) {
    errors.male = "Male population is required";
  } else {
    if (!/^[0-9 ]+$/.test(male)) {
      errors.male = "Male population can only contain number";
    }
  }

  if (!female) {
    errors.female = "Female population is required";
  } else {
    if (!/^[0-9 ]+$/.test(female)) {
      errors.female = "Female population can only contain number";
    }
  }

  var isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  next();
};

var validateUpdateData = exports.validateUpdateData = function validateUpdateData(_ref2, res, next) {
  var _ref2$body = _ref2.body,
      male = _ref2$body.male,
      female = _ref2$body.female,
      name = _ref2$body.name;

  var errors = {};

  if (male && !/^[0-9 ]+$/.test(male)) {
    errors.male = "Male population can only contain number";
  }

  if (female && !/^[0-9 ]+$/.test(female)) {
    errors.female = "Female population can only contain number";
  }

  var isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  next();
};