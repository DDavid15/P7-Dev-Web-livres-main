const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Fonction pour s'inscrire (signup)
exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({ email, password: hash });

      // Sauvegarder l'utilisateur avec le mot de passe haché
      user
        .save()
        .then(() => {
          res.status(201).json({ message: 'Utilisateur créé avec succès' });
        })
        .catch((error) => {
          console.error('Erreur lors de la création :', error.message);
          res.status(400).json({ error: "Erreur lors de la création de l'utilisateur." });
        });
    })
    .catch((error) => {
      console.error('Erreur Bcrypt :', error.message);
      res.status(500).json({ error: 'Erreur serveur' });
    });
};

// Fonction de connexion (login)
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }

      // Comparer le mot de passe saisi avec celui haché en base de données
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => {
          console.error("Erreur comparaison Bcrypt : ", error.message);
          res.status(500).json({ error: 'Erreur serveur' });
        });
    })
    .catch((error) => {
      console.error('Erreur MongoDB login :', error.message);
      res.status(500).json({ error: 'Erreur serveur' });
    });
};

/* Amélioration Future
// Fonction pour mettre à jour le mot de passe (à utiliser en cas de changement de mot de passe)
exports.updatePassword = (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email et nouveau mot de passe requis.' });
  }

  bcrypt
    .hash(newPassword, 10)
    .then((hashedPassword) => {
      User.updateOne({ email }, { password: hashedPassword })
        .then((result) => {
          if (result.nModified === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé ou mot de passe inchangé.' });
          }
          res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du mot de passe :', error.message);
          res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du mot de passe' });
        });
    })
    .catch((error) => {
      console.error('Erreur lors du hachage du mot de passe :', error.message);
      res.status(500).json({ error: 'Erreur serveur lors du hachage du mot de passe' });
    });
};
*/