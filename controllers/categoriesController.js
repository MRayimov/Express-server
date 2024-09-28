import { APIFeatures } from "../utils/apiFeatures.js";
import { Categories } from "../models/categoriesModel.js";
import { catchAsync } from "../utils/catchAsync.js";
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
  const newCategory = await Categories.create({
    name: req.body.name,
    description: req.body.description,
  });

  if (req.file) {
    newCategory.image = req.file;
  }

  res.status(201).json({
    status: "success",
    data: { newCategory },
  });
});

export const getCategory = catchAsync(async (req, res) => {
  const category = await Categories.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found whith that id", 404));
  }
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
  if (!category) {
    return next(new AppError("No category found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { category },
  });
});
export const deleteCategory = catchAsync(async (req, res) => {
  await Categories.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("No category found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
