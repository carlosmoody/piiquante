const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = uuid.v1();
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");