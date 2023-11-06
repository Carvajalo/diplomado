"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdmin = exports.userCredentials = exports.userAuthMiddleware = exports.roleValidation = void 0;
var jwt = _interopRequireWildcard(require("../services/jwt.service.js"));
var _errorUtils = require("../utils/error.utils.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* !For latter:
const role = {
  ADMIN: (callback) => callback(),
  USER: (callback) => callback(),
  unauthorized: (res) => res.status(401).json({ message: 'Unauthorized' }),
}
 */

var role = {
  admin: function admin(callback) {
    callback();
  },
  operator: function operator(callback) {
    return callback();
  },
  user: function user(callback) {
    return callback();
  }
};
var roleValidation = exports.roleValidation = function roleValidation(req, res, next) {
  try {
    var _req$headers$authoriz;
    var token = (_req$headers$authoriz = req.headers['authorization']) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
    var _role = req.body.role;
    if (!_role) return next();
    if (!token) return res.status(401).json({
      message: 'Unauthorized'
    });
    var user = jwt.verifyToken({
      token: token
    });
    if (!user || user.role !== "admin") return res.status(401).json({
      message: 'Unauthorized'
    });
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
var validateTokenRole = function validateTokenRole(req, res, next) {
  try {
    var token = req.headers['x-access-token'];
    var user = jwt.verifyToken({
      token: token
    });
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    role[user.role](function () {
      return next();
    });
  } catch (e) {}
};
var validateAdmin = exports.validateAdmin = function validateAdmin(req, res, next) {
  try {
    var token = req.headers['x-access-token'];
    var user = jwt.verifyToken({
      token: token
    });
    if (user.role !== "admin") {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};
var userAuthMiddleware = exports.userAuthMiddleware = function userAuthMiddleware(req, res, next) {
  try {
    var token = req.token;
    var user = jwt.verifyToken({
      token: token
    });
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};
var userCredentials = exports.userCredentials = function userCredentials(req, res, next) {
  try {
    var _req$headers$authoriz2;
    var token = req === null || req === void 0 ? void 0 : (_req$headers$authoriz2 = req.headers['authorization']) === null || _req$headers$authoriz2 === void 0 ? void 0 : _req$headers$authoriz2.split(' ')[1];
    if (!token) throw (0, _errorUtils.newError)({
      errors: 'Unauthorized'
    });
    var user = jwt.verifyToken({
      token: token
    });
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};