import express from "express";
import * as productsController from "../controllers/productsController.js";
import * as authController from "../controllers/authController.js";
export const productsRoutes = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(authController.protect, productsController.createProduct);
router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(authController.protect, productsController.updateProduct)
  .delete(authController.protect, productsController.deleteProduct);
