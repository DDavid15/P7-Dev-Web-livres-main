// models/user.js

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      'Veuillez entrer un email valide',
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique' });

// Exportation du modèle User
module.exports = mongoose.model('User', userSchema);
