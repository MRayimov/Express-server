import { APIFeatures } from "../utils/apiFeatures.js";
import { Categories } from "../models/categoriesModel.js";
import catchAsync from "../utils/catchAsync.js";
export const getAllCategories = catchAsync(async (req, res) => {
  const features = new APIFeatures(Categories.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const categories = await features.query;
  for (let category of categories) {
    await category.populateProductsCount();
  }
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: { categories },
  });
});
export const createCategory = catchAsync(async (req, res) => {
  const newTour = await Categories.create(req.body);
  res.status(201).json({
    status: "success",
    data: { newTour },
  });
});
export const getCategory = catchAsync(async (req, res) => {
  const category = await Categories.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: { category },
  });
});
export const updateCategory = catchAsync(async (req, res) => {
  const category = await Categories.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { category },
  });
});
export const deleteCategory = catchAsync(async (req, res) => {
  await Categories.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
