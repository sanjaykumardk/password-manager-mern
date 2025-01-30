// filepath: /c:/Users/Sanjay Kumar D.K/Desktop/Password Manager/password-manager-backend/models/password.js
const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  website: String,
  username: String,
  email: String,
  password: String,
  mobile: String,
});

module.exports = mongoose.model('Password', passwordSchema);