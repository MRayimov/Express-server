import mongoose, { Schema } from "mongoose";
import { Categories } from "./categoriesModel.js";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Product must have a name"],
    trim: true,
    maxLength: [40, "Product name can not exceed 20 characters"],
  },
  color: {
    type: [String],
    required: [true, "Product must have color"],
  },
  price: {
    type: Number,
    required: [true, "Product must have price"],
  },
  quantity: {
    type: Number,
    required: [true, "Product must have quantity"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  category: {
    type: String,
  },
});
productsSchema.pre("save", async function (next) {
  if (this.isModified("categoryId")) {
    // Fetch the category document using the id
    const category = await Categories.findById(this.categoryId);
    if (!category) {
      return next(new Error("Category not found"));
    }
    // Set the category name
    this.category = category.name;
  }
  next();
});

export const Products = mongoose.model("products", productsSchema);
