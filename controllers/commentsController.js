import { Comments } from "../models/commentsModel.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
export const getAllComments = catchAsync(async (req, res) => {
  const features = new APIFeatures(Comments.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const comments = await features.query;
  res.status(200).json({
    status: "success",
    resulst: comments.length,
    data: comments,
  });
});
export const createNewComment = catchAsync(async (req, res) => {
  const newComment = await Comments.create(req.body);
  res.status(201).json({
    status: "success",
    data: newComment,
  });
});
export const updateComment = catchAsync(async (req, res) => {
  const comment = await Comments.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!comment) {
    return next(new AppError("No comment found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: comment,
  });
});
export const deleteComment = catchAsync(async (req, res) => {
  const comment = await Comments.findByIdAndDelete(req.params.id);
  if (!comment) {
    return next(new AppError("No comment found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Successfully deleted",
  });
});
export const getComment = catchAsync(async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  if (!comment) {
    return next(new AppError("No comment found whith that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: comment,
  });
});
