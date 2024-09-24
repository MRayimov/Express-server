import express from "express";
import * as authController from "../controllers/authController.js";
export const router = express.Router();

router.route("/login").post(authController.signIn);
router.route("/signup").post(authController.signUp);
