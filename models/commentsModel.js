import Joi from "joi";
import mongoose from "mongoose";
import JoigooseModule from "joigoose";

// Initialize Joigoose
const Joigoose = JoigooseModule(mongoose);

const joiCommentsSchema = Joi.object({
  message: Joi.string().trim().max(50).min(3).required(),
  productId: Joi.string()
    .meta({
      _mongoose: { type: "ObjectId", ref: "products" },
    })
    .required(),
});
const commentsSchema = new mongoose.Schema(Joigoose.convert(joiCommentsSchema));
export const Comments = mongoose.model("comments", commentsSchema);
