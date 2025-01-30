// utils/crypto.js
import crypto from 'crypto';

// Function to generate a hash of a password using SHA-256
export const generatePasswordHash = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex'); // Returns the hashed password as a hex string
};

// Function to generate a random salt (used to make hashing more secure)
export const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex'); // Generates a random salt of 16 bytes
};

// Function to hash a password with a salt using PBKDF2 (Password-Based Key Derivation Function)
export const hashPasswordWithSalt = (password, salt) => {
  return new Promise((resolve, reject) => {
    // PBKDF2 algorithm with 100,000 iterations and 64-byte key length
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex')); // Returns the derived key (hashed password)
    });
  });
};

// Function to compare a password with its hash (to check if a user input matches stored password)
export const comparePassword = async (password, salt, hashedPassword) => {
  try {
    const hashedInputPassword = await hashPasswordWithSalt(password, salt);
    return hashedInputPassword === hashedPassword; // Returns true if passwords match
  } catch (err) {
    console.error("Error comparing password:", err);
    return false; // Returns false in case of an error
  }
};

// Function to encrypt data (for storing sensitive information like passwords)
export const encryptData = (data, key) => {
  const iv = crypto.randomBytes(16); // Initialization vector for encryption
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); // AES-256-CBC encryption

  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  return iv.toString('hex') + encryptedData; // Return the IV + encrypted data
};

// Function to decrypt encrypted data (use the key and IV to decrypt data)
export const decryptData = (encryptedData, key) => {
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract IV (first 16 bytes)
  const encryptedText = encryptedData.slice(32); // Extract encrypted data (after IV)

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData; // Returns the decrypted data (plain text)
};

// Function to generate a secure key for encryption
export const generateEncryptionKey = (password) => {
  return crypto.createHash('sha256').update(password).digest('base64').substr(0, 32); // 256-bit key
};

// Function to generate a random password of a given length (default length is 12)
export const generateRandomPassword = (length = 12) => {
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let characterPool = lowerChars + upperChars + numbers + symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
};

// Example Usage:
// 1. Hashing a password
// const hashedPassword = generatePasswordHash('myPassword123');

// 2. Encrypting data
// const encryptionKey = generateEncryptionKey('userPassword123');
// const encryptedPassword = encryptData('mySecretPassword', encryptionKey);

// 3. Decrypting data
// const decryptedPassword = decryptData(encryptedPassword, encryptionKey);

// 4. Generating a random password (for use in the AddPassword component)
