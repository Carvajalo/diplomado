export const isValidId = (id) => {
  if (!id) return false;
  return id.match(/^[0-9a-fA-F]{24}$/);
}


export const validateParamMongoId = (req, res, next) => {
  const { productId } = req.params;
  if (!productId) return res.status(400).send({ message: "Missing ID" });
  if (!isValidId(productId)) {
    return res.status(400).send({ message: "Invalid ID" });
  }
  next();
}

/* if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
  return res.status(400).send({ message: "Invalid ID" });
} */