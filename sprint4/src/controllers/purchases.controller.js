import { newError } from '../utils/error.utils.js'
import PurchaseHistory from '../models/purchaseHistory.js'
import { isValidId } from '../utils/mongo.utils.js'
import Product from '../models/products.js'

export const createPurchaseHistory = async (req, res, next) => {
  try {
    const errors = [];
    const { products, user: { id } } = req.body;

    if (!products || !products.length) errors.push({ message: 'Products cannot be empty' });

    const consolidatedProducts = products.reduce((acc, product) => {
      const existingProduct = acc.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        return acc;
      }
      acc.push(product);
      return acc;
    }, []);


    const totalPrice = consolidatedProducts.map(async (product) => {
      if (!product?.id || !isValidId(product?.id)) {
        errors.push({ message: 'Invalid ID' });
        return 0;
      }
      if (!product?.quantity || product?.quantity < 0) {
        errors.push({ message: 'Invalid quantity' });
        return 0;
      }
      const productFound = await Product.findById(product.id);
      if (!productFound) {
        errors.push({ message: `Product ${product.id} not found` });
        return 0;
      }
      if (productFound.stock < product.quantity) {
        errors.push({ message: `Not enough stock for ${productFound.name}` });
        return 0;
      }
      const updatedProduct = await Product.findByIdAndUpdate({
        _id: product.id, stock: { $gte: product.quantity }
      },
        { $inc: { stock: -product.quantity } },
        { new: true });
      if (!updatedProduct) {
        errors.push({ message: 'Not enough stock' });
        return 0;
      }
      return updatedProduct.price * product.quantity;
    });

    const totalPriceSum = await Promise.all(totalPrice).then((values) => values.reduce((a, b) => a + b, 0));


    if (errors.length) return res.status(400).json({ message: errors })
    const purchaseHistory = new PurchaseHistory({
      products: consolidatedProducts,
      userId: id,
      totalPrice: totalPriceSum,
    })
    await purchaseHistory.save();
    res.status(201).json({
      message: 'Your purchase was successful', data: {
        products: purchaseHistory.products,
        totalPrice: purchaseHistory.totalPrice,
        status: purchaseHistory.status,
        date: purchaseHistory.date,
      }
    })
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }


}


export const getPurchaseHistory = async (userId) => {
  try {
    return await this.find({ userId }).populate('productId')
  } catch (error) {
    throw newError(500, 'Error getting purchase history', error)
  }
}

export const getAllPurchaseHistory = async () => {
  try {
    return await this.find().populate('productId')
  } catch (error) {
    throw newError(500, 'Error getting purchase history', error)
  }
}