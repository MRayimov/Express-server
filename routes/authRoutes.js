import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();

router.route("/login").post(authController.signIn);
router.route("/signup").post(authController.signUp);

export default router;
