"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _config = _interopRequireDefault(require("./config.js"));
var _morgan = _interopRequireDefault(require("morgan"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _sessionRoutes = _interopRequireDefault(require("./routes/session.routes.js"));
var _productRoutes = _interopRequireDefault(require("./routes/product.routes.js"));
var _purchaseRoutes = _interopRequireDefault(require("./routes/purchase.routes.js"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

/* Implemented form-data requests */
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
app.use((0, _cors["default"])()); /* Enable cors */
app.use(_express["default"].json()); /* Enable json bodys */
app.use((0, _morgan["default"])('dev')); /* Enable morgan to see information of the requests */
app.use(_express["default"].urlencoded({
  extended: true
})); /* Enable urlencoded bodys */

app.set('port', _config["default"].PORT);
app.get('/', function (_, res) {
  res.json({
    message: 'Welcome to my application'
  });
});
app.use('/', upload.none());
app.use('/api/products', _productRoutes["default"]);
app.use('/api/purchase', _purchaseRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/auth', _sessionRoutes["default"]);
var _default = exports["default"] = app;