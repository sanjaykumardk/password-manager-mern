// components/RandomPasswordGenerator.jsx
import React, { useState } from 'react';
import '../styles/RandomPasswordGenerator.css';

const RandomPasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characterPool = lowerChars;
    if (includeUppercase) characterPool += upperChars;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="password-generator-container">
      <h2 className="password-generator-title">Random Password Generator</h2>

      <div className="generator-settings">
        <div className="settings-item">
          <label htmlFor="password-length">Length: {length}</label>
          <input
            id="password-length"
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="input-length"
          />
          {/* <div className="length-display">Password Length: {length}</div> */}
        </div>

        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="checkbox-field"
            />
            Include Uppercase Letters
          </label>
        </div>

        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="checkbox-field"
            />
            Include Numbers
          </label>
        </div>

        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="checkbox-field"
            />
            Include Symbols
          </label>
        </div>
      </div>

      <button onClick={generatePassword} className="generate-btn">Generate Password</button>

      <div className="generated-password">
        <strong>Generated Password:</strong> {generatedPassword}
      </div>
    </div>
  );
};

export default RandomPasswordGenerator;
