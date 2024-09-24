import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import ServerlessHttp from "serverless-http";
configDotenv({ path: "./config.env" });
import app from "./App/app.js";

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const port = process.env.PORT;
export const handler = ServerlessHttp(app);
