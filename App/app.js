import express from "express";
import { categoriesRoutes } from "../routes/categoriesRoutes.js";
import { productsRoutes } from "../routes/productsRoutes.js";
import AppError from "../utils/appError.js";
import { authRoutes } from "../routes/authRoutes.js";
import { errorController } from "../controllers/errorController.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggetUi from "swagger-ui-express";
import { version } from "mongoose";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Work Project",
      version: "1.0.0",
    },
    servers: [{ api: "https://mr-work.netlify.app/" }],
  },
  apis: ["../routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
export const app = express();
app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerSpec));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/users", authRoutes);
app.all("*", (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorController);
