const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = (req, res, next) => {
  if (!req.file) return next();

  const { filename } = req.file;
  const inputPath = path.join(__dirname, '../images', filename);
  const outputPath = path.join(__dirname, '../images', 'optimized_' + filename);

  sharp(inputPath)
    .resize({ width: 500, withoutEnlargement: true }) // ajustable selon ton besoin
    .jpeg({ quality: 70 }) // réduction du poids
    .toFile(outputPath)
    .then(() => {
      fs.unlink(inputPath, (err) => {
        if (err) {
          console.error(
            'Erreur lors de la suppression du fichier original',
            err,
          );
        }
        req.file.filename = 'optimized_' + filename;
        next();
      });
    })
    .catch((err) => {
      console.error('Erreur optimisation image :', err);
      res
        .status(500)
        .json({ error: "Erreur lors de l'optimisation de l'image" });
    });
};
