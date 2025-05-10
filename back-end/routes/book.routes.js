const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const optimizeImage = require('../middlewares/optimizeImage');
const bookCtrl = require('../controllers/book.controller');
const Book = require('../models/book'); // Ajouter cette ligne pour importer le modèle Book

// Middleware pour vérifier la propriété d'un livre
const checkOwnership = (req, res, next) => {
  const bookId = req.params.id;
  Book.findById(bookId)
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        return res.status(403).json({
          error: "Accès interdit : vous n'êtes pas le propriétaire de ce livre",
        });
      }
      next();
    })
    .catch((error) => res.status(500).json({ error }));
};

// Routes publiques
router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);

console.log('rateBook typeof:', typeof bookCtrl.rateBook);

console.log('Routes /api/books chargées');

// Routes sécurisées avec authentification
router.post(
  '/',
  auth,
  multer,
  (req, res, next) => {
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }
    next();
  },
  optimizeImage,
  bookCtrl.createBook,
);

router.put(
  '/:id',
  auth,
  multer,
  optimizeImage,
  checkOwnership,
  bookCtrl.updateBook,
);
router.delete('/:id', auth, checkOwnership, bookCtrl.deleteBook);

router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;
