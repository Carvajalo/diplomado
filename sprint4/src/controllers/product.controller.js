import Product from '../models/products.js';

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const productSaved = await newProduct.save();
    res.status(202).json(productSaved);
  } catch (error) {
    console.log(error)
    return res.status(error.status || 400).json({ message: error.message });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;

    /* if (!page) return res.status(400).json(await Product.find({})); */
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
    }
    const products = await Product.paginate({}, options);

    res.status(200).json({ products: products.docs, total: products.totalDocs, limit: products.limit, page: products.page, pages: products.totalPages, next: products.nextPage, prev: products.prevPage });

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const productFound = await Product.findById(req?.params?.productId);
    if (!productFound) return res.status(404).json({ message: "Product not found" });
    res.json(productFound);
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
}

export const updateProductById = async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.productId);
    if (!productFound)
      return res.status(404).json({ message: "Product not found" });
    const productUpdated = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      req.body,
      { new: true });
    res.json(productUpdated);

  } catch (error) {
    return res.status(error.status || 400).json({ messages: error.message });
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const productDeleted = await Product.findOneAndDelete({ _id: req.params.productId });
    if (!productDeleted) return res.status(404).json({ message: "Product not found" });
    res.json(productDeleted);


  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
}

