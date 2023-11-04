import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt"
import { newError } from "../utils/error.utils.js";

export const userTypes = ["admin", "operator", "user"]

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
      // immutable: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 100,
    },
    role: {
      type: String,
      enum: userTypes,
      default: "user",
    },
    address: {
      type: String,
      maxlength: 100,
    },
    zipCode: {
      type: Number,
      maxlength: 10,
    },
    prefix: {
      type: String,
      maxlength: 20,
      default: "+57",
    },
    phone: {
      type: Number,
      maxlength: 20,
    },
    profilePicture: {
      type: String,
      maxlength: 100,
    },
    city: {
      type: String,
      maxlength: 100,
    },
    state: {
      type: String,
      maxlength: 100,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
})



userSchema.pre('save', async function (next) {
  let errors = {};
  try {
    const existingUser = await this.constructor.findOne({
      $or: [
        { name: this?.name },
        { email: this?.email }
      ]
    });
    if (!existingUser) return next();
    if (existingUser?.name === this.name) {
      errors = {
        ...errors,
        name: 'Username is already in use'
      }
    }
    if (existingUser?.email === this.email) {
      errors = {
        ...errors,
        email: 'Email is already in use'
      }
    }
    if (Object.keys(errors)?.length) {
      return next(newError({ errors, name: 'ValidationError', status: 409 }));
    }
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update?.password) {
    this._update.password = await this?.schema?.methods?.newPassword(this._update.password, 10);
  }
  next()
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const errors = [];
  try {
    const existingUser = await this.model.findOne({
      $or: [
        { _id: this.getQuery()._id },
        { name: this._update?.name },
        { email: this._update?.email }
      ]
    });

    if (!existingUser) return next();
    if (existingUser?.name === this?._update?.name) {
      errors.push({ name: 'El nombre de usuario ya está en uso' })
    }
    if (existingUser?.email === this?._update?.email) {
      errors.push({ email: 'El email ya está en uso' })
    }
    if (errors?.length) {
      return next(newError({ errors, name: 'ValidationError', status: 409 }));
    }

  } catch (err) {
    next(err);
  }
});




userSchema.post('validate', function (doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

userSchema.methods.newPassword = function ({ password }) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return err;
    return hash;

  });
}


userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
}


export default model("User", userSchema);
