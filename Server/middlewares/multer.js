const multer = require("multer");
const path = require("path");

// For images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

// For video links with similar format as images
const videoLinkStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos");
  },
  filename: (req, file, cb) => {
    const videoId = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${videoId}-${file.originalname}${extension}`);
  },
});

const uploadImage = multer({ storage: imageStorage });
// Update to accept an array of video links
const uploadVideoLinks = multer({ storage: videoLinkStorage }).array(
  "video_links"
);

module.exports = { uploadImage, uploadVideoLinks };