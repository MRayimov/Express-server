import mongoose from "mongoose";
import { Categories } from "./categoriesModel.js";
import { Comments } from "./commentsModel.js";
import Joi from "joi";
import JoigooseModule from "joigoose";
const Joigoose = JoigooseModule(mongoose);
const joiProductsSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .meta({
      _mongoose: { unique: true },
    })
    .pattern(/[a-zA-Z]/),
  color: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  createdAt: {
    type: Joi.date(),
    default: Date.now(),
    select: false,
  },
  categoryId: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "categories" },
  }),
  category: Joi.string(),
  image: Joi.object(),
});
const productsSchema = new mongoose.Schema(
  Joigoose.convert(joiProductsSchema),
  {
    toJSON: { virtuals: true },
  }
);
productsSchema.virtual("commentsCount").get(function () {
  return this._productsCount; // Placeholder to hold the count
});

productsSchema.methods.populateProductsCount = async function () {
  const commentsCount = await Comments.countDocuments({ productId: this._id });
  this._commentsCount = commentsCount; // Assign the count dynamically
};

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
