import { Schema, model } from "mongoose";


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 100,
    },
    stock: {
      type: Number,
      required: true,
      maxlength: 100,
    },
    discount: {
      type: Number,
      required: true,
      maxlength: 100,
    },
    category: {
      type: [String],
      required: true,
      maxlength: 100,
      default: "General",
    },
    image: {
      type: [String],
      required: true,
      maxlength: 600,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


export default model("Product", productSchema);