"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParamMongoId = exports.isValidId = void 0;
var isValidId = exports.isValidId = function isValidId(id) {
  if (!id) return false;
  return id.match(/^[0-9a-fA-F]{24}$/);
};
var validateParamMongoId = exports.validateParamMongoId = function validateParamMongoId(req, res, next) {
  var productId = req.params.productId;
  if (!productId) return res.status(400).send({
    message: "Missing ID"
  });
  if (!isValidId(productId)) {
    return res.status(400).send({
      message: "Invalid ID"
    });
  }
  next();
};

/* if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
  return res.status(400).send({ message: "Invalid ID" });
} */