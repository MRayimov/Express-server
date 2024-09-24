import { configDotenv } from "dotenv";
import mongoose, { version } from "mongoose";

configDotenv({ path: "./config.env" });
import { app } from "./app.js";

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
