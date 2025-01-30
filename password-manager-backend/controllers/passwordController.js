// filepath: /c:/Users/Sanjay Kumar D.K/Desktop/Password Manager/password-manager-backend/controllers/passwordController.js
const Password = require('../models/password');

exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPassword = async (req, res) => {
  const password = new Password(req.body);
  try {
    const newPassword = await password.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const updatedPassword = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: 'Password deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};