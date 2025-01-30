const express = require('express');
const { getPasswords, addPassword, updatePassword, deletePassword } = require('../controllers/passwordController');

const router = express.Router();

// GET all passwords
router.get('/', getPasswords);

// POST a new password
router.post('/', addPassword);

// PUT update a password by ID
router.put('/:id', updatePassword);

// DELETE a password by ID
router.delete('/:id', deletePassword);

module.exports = router;