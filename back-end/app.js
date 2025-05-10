const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const bookRoutes = require('./routes/book.routes');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/db');

const app = express();

// Connexion à MongoDB
db.connect();

// Middleware de sécurité
app.use(helmet());

// Middleware CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Middleware pour gérer les corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Accès au dossier images
app.use('/images', express.static(path.join(__dirname, 'images'), {
  setHeaders: (res, path) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Routes API
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Log de l'erreur détaillée
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? "Quelque chose s'est mal passé, veuillez réessayer plus tard." 
      : err.message, // En développement, on retourne le message d'erreur pour aider au débogage
  });
});

module.exports = app;
