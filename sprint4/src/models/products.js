import { Schema, model } from "mongoose";
import { newError } from "../utils/error.utils.js";
import mongoosePaginate from "mongoose-paginate-v2";


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
      maxlength: 100,
    },
    category: {
      type: [String],
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

productSchema.plugin(mongoosePaginate);


productSchema.pre('save', async function (next) {
  const errors = [];
  try {
    if (this?.discount > 100) errors.push({ message: "Discount cannot be greater than 100" });
    if (this?.discount < 0) errors.push({ message: "Discount cannot be less than 0" });
    if (this?.price < 0) errors.push({ message: "Price cannot be less than 0" });
    if (this?.stock < 0) errors.push({ message: "Stock cannot be less than 0" });
    if (this?.image.length === 0) errors.push({ message: "Image cannot be empty" });
    if (this?.category.length === 0) errors.push({ message: "Category cannot be empty" });

    if (errors.length > 0) {
      return next(new Error({ errors, name: 'Product save error', status: 409 }));
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

productSchema.pre('save', async function (next) {
  const errors = [];
  try {
    if (!this._id) return next(newError({ errors, name: 'Product save error', status: 409 }));
    const existingProduct = await this.constructor.findOne({
      name: this?.name
    }
    );
    if (!existingProduct) return next();
    if (existingProduct) errors.push({ message: "Product already exists" });
    return next(newError({ errors, name: 'Product save error', status: 409 }));

  } catch (error) {
    console.log(error);
  }
});

productSchema.pre('findOneAndUpdate', async function (next) {
  const errors = [];
  try {
    if (this._update._id) errors.push({ id: "Product id cannot be updated" });
    if (this._update?.discount > 100) errors.push({ message: "Discount cannot be greater than 100" });
    if (this._update?.discount < 0) errors.push({ message: "Discount cannot be less than 0" });
    if (this._update?.price < 0) errors.push({ message: "Price cannot be less than 0" });
    if (this._update?.stock < 0) errors.push({ message: "Stock cannot be less than 0" });
    if (this._update?.image?.length === 0) errors.push({ message: "Image cannot be empty" });
    if (this._update?.category?.length === 0) errors.push({ message: "Category cannot be empty" });
    if (this._update?.name) {
      const existingProduct = await this.constructor.findOne({
        name: this._update?.name
      }
      );
      if (existingProduct) errors.push({ message: "Product already exists" });
    }
    console.log()
    if (errors && errors.length > 0) {
      return next(newError({ errors, name: 'Product update error', status: 409 }));
    }
    next()
  } catch (error) {
    console.log(error);
  }
});

export default model("Product", productSchema);

