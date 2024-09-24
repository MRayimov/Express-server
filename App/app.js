import express from "express";
import categoriesRoutes from "../routes/categoriesRoutes.js";
import productsRoutes from "../routes/productsRoutes.js";
import AppError from "../utils/appError.js";
import authRoutes from "../routes/authRoutes.js";
import { errorController } from "../controllers/errorController.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
// app.use("/categories", categoriesRoutes);
// app.use("/products", productsRoutes);
app.use("/users", authRoutes);
app.all("*", (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorController);
export default app;
