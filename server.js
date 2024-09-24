import { configDotenv } from "dotenv";
import mongoose, { version } from "mongoose";
import serverless from "serverless-http";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";
configDotenv({ path: "./config.env" });
import { app } from "./App/app.js";
const swaggerDocument = yamljs.load({ path: "./swagger.yaml" }); // Adjust path as needed

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const port = process.env.PORT;
export const handler = serverless(app);
