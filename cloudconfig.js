const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { v4: uuid } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Custom Cloudinary storage
const storage = multer.memoryStorage(); // store file in memory first

const upload = multer({ storage });

async function uploadToCloudinary(file) {
  const result = await cloudinary.uploader.upload_stream(
    { folder: "library_DEV", public_id: uuid() },
    (error, result) => {
      if (error) throw error;
      return result;
    }
  );
  return result;
}

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary
};