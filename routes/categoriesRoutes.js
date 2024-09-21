import express from "express";
import * as categoriesController from "../controllers/categoriesController.js";
import * as authController from "../controllers/authController.js";
const router = express.Router();

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(authController.protect, categoriesController.createCategory);
router
  .route("/:id")
  .get(categoriesController.getCategory)
  .patch(authController.protect, categoriesController.updateCategory)
  .delete(authController.protect, categoriesController.deleteCategory);

export default router;
