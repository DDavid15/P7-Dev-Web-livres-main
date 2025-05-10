const Book = require('../models/book');
const fs = require('fs');
const path = require('path');
const formatBook = require('../utils/formatBook');

exports.createBook = async (req, res, next) => {
  res.status(201).json({ message: 'CreateBook OK (exemple)' });
};

// GET /api/books
exports.getAllBooks = async (req, res) => {
  console.log('Requête reçue sur /api/books à', new Date().toISOString());
  try {
    const books = await Book.find();

    const formattedBooks = books.map(formatBook);

    res.status(200).json(formattedBooks);
    console.log(books);
  } catch (error) {
    console.error('Erreur lors de la récupération des livres :', error.message);
    res.status(400).json({ error: error.message });
  }
};

// GET /api/books/:id
exports.getOneBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });

    res.status(200).json(formatBook(book));
  } catch (error) {
    console.error('Erreur lors de la récupération du livre :', error.message);
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });
    if (book.userId !== req.auth.userId)
      return res.status(403).json({ error: 'Requête non autorisée' });

    const updatedBook = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
      : req.body;

    if (req.file && book.imageUrl) {
      const oldFilename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${oldFilename}`, async () => {
        await Book.findByIdAndUpdate(req.params.id, updatedBook, { new: true });
        res.status(200).json({ message: 'Livre modifié avec image !' });
      });
    } else {
      await Book.findByIdAndUpdate(req.params.id, updatedBook, { new: true });
      res.status(200).json({ message: 'Livre modifié !' });
    }
  } catch (error) {
    console.error('❌ Erreur lors de la modification :', error.message);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });
    if (book.userId !== req.auth.userId)
      return res.status(403).json({ error: 'Requête non autorisée' });

    const filename = book.imageUrl.split('/images/')[1];
    try {
      await fs.promises.unlink(`images/${filename}`);
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Livre supprimé !' });
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'image :", error.message);
      res.status(500).json({ error: 'Erreur lors de la suppression du fichier image' });
    }
  } catch (error) {
    console.error('❌ Erreur lors de la suppression :', error.message);
    res.status(500).json({ error: error.message });
  }
};
/*
// POST /api/books/:id
exports.postBook = async (req, res, next) => {
  
  }
};
*/
// POST /api/books/:id/rating
exports.rateBook = async (req, res, next) => {
  const { userId, rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Note invalide (doit être entre 0 et 5)' });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });

    const alreadyRated = book.ratings.find((r) => r.userId === userId);
    if (alreadyRated) {
      return res.status(400).json({ error: 'Utilisateur a déjà noté ce livre' });
    }

    book.ratings.push({ userId, grade: rating });

    const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);
    book.averageRating = total / book.ratings.length;

    const updatedBook = await book.save();
    res.status(200).json(formatBook(updatedBook));
  } catch (error) {
    console.error('Erreur lors de la notation :', error.message);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/books/bestrating
exports.getBestRatedBooks = async (req, res) => {
  try {
    const bestRatedBooks = await Book.find()
      .sort({ averageRating: -1 })
      .limit(10);

    const formatted = bestRatedBooks.map(formatBook);
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Erreur lors de la récupération des livres les mieux notés:', error.message);
    res.status(500).json({ error: error.message });
  }
};
