import { APIFeatures } from "../utils/apiFeatures.js";
import { Products } from "../models/productsModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
export const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Products.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});
export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Products.create(req.body);
  if (req.file) {
    newCategory.image = req.file;
  }
  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
});
export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product found whith that id", 404));
  }
  res.status(201).json({
    status: "success",
    data: { product },
  });
});
export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError("No product found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { product },
  });
});
export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No product found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
