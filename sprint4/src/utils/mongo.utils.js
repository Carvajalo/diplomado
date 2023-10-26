
export const validateMongoId = (req, res, next) => {
  const { productId } = req.params;
  if(!productId) return res.status(400).send({ message: "Missing ID" });
  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ message: "Invalid ID" });
  }
  next();
}