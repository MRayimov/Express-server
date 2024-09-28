import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
