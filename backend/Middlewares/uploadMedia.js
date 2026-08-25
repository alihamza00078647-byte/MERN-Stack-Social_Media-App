const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Alag-alag folders image aur video ke liye
const imageDir = "uploads/images/";
const videoDir = "uploads/videos/";
[imageDir, videoDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Destination decide hota hai field name se - "image" field -> imageDir, "video" field -> videoDir
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, videoDir);
    } else {
      cb(null, imageDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Field ke hisaab se sahi mimetype check karo
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  const allowedVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime", // .mov
    "video/x-matroska", // .mkv
    "video/x-msvideo", // .avi
  ];

  if (file.fieldname === "image" && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "video" && allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type "${file.mimetype}" for field "${file.fieldname}"`), false);
  }
};

// Note: multer ka fileSize limit globally lagta hai har field pe.
// 50MB video ke liye theek hai; agar image pe alag (chhota) limit chahiye,
// to controller mein req.files.image[0].size manually check karo aur reject karo.
const uploadMedia = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB ceiling
  },
});

module.exports = uploadMedia;