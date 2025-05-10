const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Vérification que le token est bien dans l'en-tête Authorization
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(400).json({ error: 'Token mal formé' });
    }

    const token = authorization.split(' ')[1]; // format: Bearer <token>

    // Vérification du token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.auth = { userId: decodedToken.userId };

    console.log('Token décodé :', decodedToken); // (à enlever plus tard)
    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error.message);
    res.status(401).json({ error: 'Requête non authentifiée' });
  }
};
