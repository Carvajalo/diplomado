"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.regenerateToken = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config.js"));
var _errorUtils = require("../utils/error.utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var JWT_SECRET = _config["default"].JWT_SECRET,
  TOKEN_EXPIRATION_TIME = _config["default"].TOKEN_EXPIRATION_TIME;
var generateToken = exports.generateToken = function generateToken(_ref) {
  var payload = _ref.payload;
  return _jsonwebtoken["default"].sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION_TIME
  });
};
var verifyToken = exports.verifyToken = function verifyToken(_ref2) {
  var token = _ref2.token;
  try {
    return _jsonwebtoken["default"].verify(token, JWT_SECRET);
  } catch (e) {
    throw (0, _errorUtils.newError)({
      errors: 'Token expired',
      name: 'TokenExpiredError',
      status: 401
    });
  }
};
var regenerateToken = exports.regenerateToken = function regenerateToken(_ref3) {
  var token = _ref3.token;
  var _verifyToken = verifyToken({
      token: token
    }),
    payload = _verifyToken.payload;
  return generateToken({
    payload: payload
  });
};