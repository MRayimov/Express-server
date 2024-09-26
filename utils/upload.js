import fs from "fs";
import path from "path";
import multer from "multer";

// Create uploads folder if it doesn't exist
const uploadDir = path.join(import.meta.dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    callback(null, Date.now() + ext);
  },
});

export const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      callback(new Error("Only .png and .jpeg formats are allowed!"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // Limit size to 2MB
  },
});
