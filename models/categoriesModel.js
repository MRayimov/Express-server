import mongoose from "mongoose";
import { Products } from "./productsModel.js";
import Joi from "joi";
import JoigooseModule from "joigoose";

// Initialize Joigoose
const Joigoose = JoigooseModule(mongoose);

// Define your Joi schema
const joiCategoriesSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(30)
    .min(3)
    .meta({
      _mongoose: { unique: true },
    })
    .pattern(/[a-zA-Z]/),
  createdAt: Joi.date()
    .default(Date.now)
    .meta({
      _mongoose: { select: false },
    }),
  description: Joi.string().trim().max(50),
  image: Joi.object(),
});

// Convert Joi schema to Mongoose schema using Joigoose
const categoriesSchema = new mongoose.Schema(
  Joigoose.convert(joiCategoriesSchema),
  {
    toJSON: { virtuals: true }, // Add toJSON options here
    toObject: { virtuals: true }, // Add toObject options here
  }
);

// Adding the virtual and custom methods
categoriesSchema.virtual("productsCount").get(function () {
  return this._productsCount; // Placeholder to hold the count
});

categoriesSchema.methods.populateProductsCount = async function () {
  const productsCount = await Products.countDocuments({ categoryId: this._id });
  this._productsCount = productsCount; // Assign the count dynamically
};

// Create the Mongoose model
export const Categories = mongoose.model("categories", categoriesSchema);
