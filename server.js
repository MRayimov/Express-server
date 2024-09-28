import { configDotenv } from "dotenv";
configDotenv({ path: "./config.env" });
import { connectDB } from "./utils/connectDB.js";
connectDB();
import { app } from "./app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
