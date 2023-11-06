"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _errorUtils = require("../utils/error.utils.js");
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var productSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    maxlength: 100
  },
  stock: {
    type: Number,
    required: true,
    maxlength: 100
  },
  discount: {
    type: Number,
    maxlength: 100
  },
  category: {
    type: [String],
    maxlength: 100,
    "default": "General"
  },
  image: {
    type: [String],
    required: true,
    maxlength: 600,
    "default": []
  }
}, {
  timestamps: true
});
productSchema.plugin(_mongoosePaginateV["default"]);
productSchema.pre('save', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(next) {
    var errors;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errors = [];
          _context.prev = 1;
          if ((this === null || this === void 0 ? void 0 : this.discount) > 100) errors.push({
            message: "Discount cannot be greater than 100"
          });
          if ((this === null || this === void 0 ? void 0 : this.discount) < 0) errors.push({
            message: "Discount cannot be less than 0"
          });
          if ((this === null || this === void 0 ? void 0 : this.price) < 0) errors.push({
            message: "Price cannot be less than 0"
          });
          if ((this === null || this === void 0 ? void 0 : this.stock) < 0) errors.push({
            message: "Stock cannot be less than 0"
          });
          if ((this === null || this === void 0 ? void 0 : this.image.length) === 0) errors.push({
            message: "Image cannot be empty"
          });
          if ((this === null || this === void 0 ? void 0 : this.category.length) === 0) errors.push({
            message: "Category cannot be empty"
          });
          if (!(errors.length > 0)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", next(new Error({
            errors: errors,
            name: 'Product save error',
            status: 409
          })));
        case 12:
          next();
        case 13:
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[1, 15]]);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
productSchema.pre('save', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(next) {
    var errors, existingProduct;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          errors = [];
          _context2.prev = 1;
          if (this._id) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", next((0, _errorUtils.newError)({
            errors: errors,
            name: 'Product save error',
            status: 409
          })));
        case 4:
          _context2.next = 6;
          return this.constructor.findOne({
            name: this === null || this === void 0 ? void 0 : this.name
          });
        case 6:
          existingProduct = _context2.sent;
          if (existingProduct) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", next());
        case 9:
          if (existingProduct) errors.push({
            message: "Product already exists"
          });
          return _context2.abrupt("return", next((0, _errorUtils.newError)({
            errors: errors,
            name: 'Product save error',
            status: 409
          })));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[1, 13]]);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
productSchema.pre('findOneAndUpdate', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(next) {
    var errors, _Object$keys, _this$_update, name, discount, price, stock, image, category, _this$_update2, _existingProduct$_id, _this$getQuery, existingProduct;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          errors = {};
          _context3.prev = 1;
          _this$_update = this._update, name = _this$_update.name, discount = _this$_update.discount, price = _this$_update.price, stock = _this$_update.stock, image = _this$_update.image, category = _this$_update.category;
          if (this._update._id) errors = _objectSpread(_objectSpread({}, errors), {}, {
            _id: 'Cannot update _id'
          });
          if (discount && discount > 100) errors = _objectSpread(_objectSpread({}, errors), {}, {
            discount: "Discount cannot be greater than 100"
          });
          if (discount && discount < 0) errors = _objectSpread(_objectSpread({}, errors), {}, {
            discount: "Discount cannot be less than 0"
          });
          if (price && price < 0) errors = _objectSpread(_objectSpread({}, errors), {}, {
            price: "Price cannot be less than 0"
          });
          if (stock && stock < 0) errors = _objectSpread(_objectSpread({}, errors), {}, {
            stock: "Stock cannot be less than 0"
          });
          if (image && (image === null || image === void 0 ? void 0 : image.length) === 0) errors = _objectSpread(_objectSpread({}, errors), {}, {
            image: "Image cannot be empty"
          });
          if (category && (category === null || category === void 0 ? void 0 : category.length) === 0) errors = _objectSpread(_objectSpread({}, errors), {}, {
            category: "Category cannot be empty"
          });
          if (!name) {
            _context3.next = 15;
            break;
          }
          _context3.next = 13;
          return this.model.findOne({
            name: (_this$_update2 = this._update) === null || _this$_update2 === void 0 ? void 0 : _this$_update2.name
          });
        case 13:
          existingProduct = _context3.sent;
          /* console.log({existingProduct: {name: existingProduct?.name, _id:existingProduct?._id?.toString(),},update: {name: this._update?.name,_id: this.getQuery()}}); */
          if (existingProduct && ((_existingProduct$_id = existingProduct._id) === null || _existingProduct$_id === void 0 ? void 0 : _existingProduct$_id.toString()) !== ((_this$getQuery = this.getQuery()) === null || _this$getQuery === void 0 ? void 0 : _this$getQuery._id)) errors = _objectSpread(_objectSpread({}, errors), {}, {
            name: 'Product name already exists'
          });
        case 15:
          if (!(errors && (_Object$keys = Object.keys(errors)) !== null && _Object$keys !== void 0 && _Object$keys.length)) {
            _context3.next = 17;
            break;
          }
          throw (0, _errorUtils.newError)({
            errors: errors,
            name: 'Product update error',
            status: 409
          });
        case 17:
          next();
          _context3.next = 23;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](1);
          throw (0, _errorUtils.newError)({
            errors: _context3.t0.message,
            name: 'Product update error',
            status: 409,
            stack: _context3.t0.stack
          });
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this, [[1, 20]]);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = exports["default"] = (0, _mongoose.model)("Product", productSchema);