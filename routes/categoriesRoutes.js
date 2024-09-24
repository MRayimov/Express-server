import express from "express";
import * as categoriesController from "../controllers/categoriesController.js";
import * as authController from "../controllers/authController.js";
export const categoriesRoutes = express.Router();

categoriesRoutes
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(authController.protect, categoriesController.createCategory);
categoriesRoutes
  .route("/:id")
  .get(categoriesController.getCategory)
  .patch(authController.protect, categoriesController.updateCategory)
  .delete(authController.protect, categoriesController.deleteCategory);
