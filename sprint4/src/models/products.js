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
  let errors = {};
  try {
    const {
      name,
      discount,
      price,
      stock,
      image,
      category
    } = this._update;

    if (this._update._id) errors = { ...errors, _id: 'Cannot update _id' };
    if (discount && discount > 100) errors = { ...errors, discount: "Discount cannot be greater than 100" };
    if (discount && discount < 0) errors = { ...errors, discount: "Discount cannot be less than 0" };
    if (price && price < 0) errors = { ...errors, price: "Price cannot be less than 0" };
    if (stock && stock < 0) errors = { ...errors, stock: "Stock cannot be less than 0" };
    if (image && image?.length === 0) errors = { ...errors, image: "Image cannot be empty" };
    if (category && category?.length === 0) errors = { ...errors, category: "Category cannot be empty" };
    if (name) {
      const existingProduct = await this.model.findOne({ name: this._update?.name });
      /* console.log({existingProduct: {name: existingProduct?.name, _id:existingProduct?._id?.toString(),},update: {name: this._update?.name,_id: this.getQuery()}}); */
      if (existingProduct && existingProduct._id?.toString() !== this.getQuery()?._id) errors = { ...errors, name: 'Product name already exists' }
    }
    if (errors && Object.keys(errors)?.length) {
      throw newError({ errors, name: 'Product update error', status: 409 })
    }
    next()
  } catch (error) {
    throw newError({ errors: error.message, name: 'Product update error', status: 409, stack: error.stack })
  }
});

export default model("Product", productSchema);

