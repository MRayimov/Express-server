import express from "express";
import * as authController from "../controllers/authController.js";
export const authRoutes = express.Router();

authRoutes.route("/login").post(authController.signIn);
authRoutes.route("/signup").post(authController.signUp);
