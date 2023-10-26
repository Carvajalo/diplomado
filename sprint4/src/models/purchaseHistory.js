import mongoose, { Squema, model, mongo } from 'mongoose';
import { newError } from '../utils/error.utils.js';

export const types = ['sucess', 'error']

const purchaseHistorySchema = new Squema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: types, default: 'sucess' },
  date: { type: Date, default: Date.now, mutable: false },
})


export default model('PurchaseHistory', purchaseHistorySchema)
