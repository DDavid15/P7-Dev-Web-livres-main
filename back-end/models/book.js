const mongoose = require('mongoose');

// Sous-schema pour les évaluations (ratings)
const ratingSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    grade: {
      type: Number,
      required: true,
      min: [0, 'Note minimale = 0'],
      max: [5, 'Note maximale = 5'],
    },
  },
  { timestamps: true } // pour avoir createdAt / updatedAt si besoin
);

// Schéma principal du livre
const bookSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true, min: 0 },
    genre: { type: String, required: true },
    ratings: [ratingSchema],
    averageRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true, // pour les dates d'ajout/modif
  }
);

// On applique le validateur d’unicité si nécessaire
// bookSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Book', bookSchema);
