import mongoose from "mongoose";
import { Products } from "./productsModel.js";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Category must have a name"],
      trim: true,
      maxLength: [30, "Category name can not exceed 20 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [50, "Category description can not exceed 50 characters"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
categoriesSchema.virtual("productsCount").get(function () {
  return this._productsCount; // Placeholder to hold the count
});
categoriesSchema.methods.populateProductsCount = async function () {
  const productsCount = await Products.countDocuments({ categoryId: this._id });
  this._productsCount = productsCount; // Assign the count dynamically
};
export const Categories = mongoose.model("categories", categoriesSchema);
