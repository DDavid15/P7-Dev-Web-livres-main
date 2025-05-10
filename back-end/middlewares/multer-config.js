const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '_' + Date.now() + '.' + extension);
  },
});

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true); // Accepter le fichier
  } else {
    callback(new Error('Format de fichier non autorisé'), false); // Rejeter le fichier
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mo
  fileFilter,
}).single('image');

module.exports = upload;
