require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI manquant dans .env');
    process.exit(1);
  }

  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,  // Timeout pour la connexion (30 secondes)
    serverSelectionTimeoutMS: 30000  // Timeout pour la sélection du serveur (30 secondes)
  })
  .catch((err) => {
    console.error('Échec de la connexion MongoDB :', err);
    process.exit(1);
  });
};
