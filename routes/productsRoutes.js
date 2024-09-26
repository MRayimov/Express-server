import express from "express";
import * as productsController from "../controllers/productsController.js";
import * as authController from "../controllers/authController.js";
import { upload } from "../utils/upload.js";
export const productsRoutes = express.Router();

productsRoutes
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    upload.single("image"),
    productsController.createProduct
  );
productsRoutes
  .route("/:id")
  .get(productsController.getProduct)
  .patch(
    authController.protect,
    upload.single("image"),
    productsController.updateProduct
  )
  .delete(authController.protect, productsController.deleteProduct);
