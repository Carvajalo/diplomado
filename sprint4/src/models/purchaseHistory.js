import mongoose, { Schema, model, Document } from "mongoose";
import { isValidId } from '../utils/mongo.utils.js';

import { newError } from '../utils/error.utils.js';

export const types = ['sucess', 'error']

const purchaseHistorySchema = new Schema({
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: types, default: 'sucess' },
  date: { type: Date, default: Date.now, mutable: false },
})



export default model('PurchaseHistory', purchaseHistorySchema)
