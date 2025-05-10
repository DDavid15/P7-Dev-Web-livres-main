// models/user.js

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
