import { configDotenv } from "dotenv";
import mongoose, { version } from "mongoose";
import serverless from "serverless-http";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
configDotenv({ path: "./config.env" });
import { app } from "./App/app.js";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Welcome",
      version: "0.1",
    },
    servers: [
      {
        url: "https://mr-work.netlify.app/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const port = process.env.PORT;
export const handler = serverless(app);
