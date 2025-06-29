const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'monvieuxgrimoire',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, crop: 'limit' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('image');

module.exports = upload;
