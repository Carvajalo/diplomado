"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.API_URL = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var baseUrl = function baseUrl() {
  var NODE_ENV = process.env.NODE_ENV;
  var urls = {
    development: '3000',
    production: 'myapp.com',
    test: 'http://localhost:3000'
  };
  return urls[NODE_ENV] || urls.development;
};
var BASE_URL = baseUrl();
var API_URL = exports.API_URL = "".concat(BASE_URL, "/api/v1");
var _default = exports["default"] = {
  PORT: process.env.PORT || 3000,
  MONGO_HOST: process.env.MONGO_HOST || '127.0.0.1',
  MONGO_USER: process.env.MONGO_USER || '<password>',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || '<password>',
  MONGO_DATABASE: process.env.MONGO_DATABASE || '<database>',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME || '3w',
  MONGO_CLUSTER: process.env.MONGO_CLUSTER || '<clusterName>',
  API_URL: API_URL
};