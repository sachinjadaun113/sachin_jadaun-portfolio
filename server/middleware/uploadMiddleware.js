import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",

  // Videos
  "video/mp4",
  "video/webm",
  "video/quicktime",

  // Documents
  "application/pdf",
];

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".mp4",
  ".webm",
  ".mov",
  ".pdf",
];

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  console.log("========== FILE UPLOAD ==========");
  console.log("File name:", file.originalname);
  console.log("MIME type:", file.mimetype);
  console.log("Extension:", extension);
  console.log("=================================");

  // Accept if MIME type is valid
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  // Some clients/Postman may send application/octet-stream.
  // In that case, validate using the file extension.
  if (
    file.mimetype === "application/octet-stream" &&
    allowedExtensions.includes(extension)
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, MP4, WEBM, MOV and PDF files are allowed"
    ),
    false
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default upload;