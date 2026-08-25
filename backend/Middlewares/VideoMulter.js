const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Ensure video uploads folder exists
const videoDir = "uploads/videos/";
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Storage config - alag folder, alag naming
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Sirf common video formats allow karo
const videoFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime", // .mov
    "video/x-matroska", // .mkv
    "video/x-msvideo", // .avi
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files (mp4, webm, mov, mkv, avi, ogg) are allowed"), false);
  }
};

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB - videos ko usually zyada space chahiye images se
  },
});

exports.uploadVideo = uploadVideo;