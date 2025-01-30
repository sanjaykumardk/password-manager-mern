// filepath: /c:/Users/Sanjay Kumar D.K/Desktop/Password Manager/password-manager/src/components/AddPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPassword.css';
// import { generateRandomPassword } from '../utils/crypto';

const AddPassword = ({ onAddPassword }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [mobile, setMobile] = useState('');
  // const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFieldToggle = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  // const handleGeneratePassword = () => {
  //   const newPassword = generateRandomPassword(12);
  //   setGeneratedPassword(newPassword);
  //   setPassword(newPassword);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFields.length === 0 || !password) {
      setError('Please select at least one field and provide a password.');
      return;
    }

    setError('');
    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
    const newPasswordData = {
      ...(selectedFields.includes('website') && { website }),
      ...(selectedFields.includes('email') && { email }),
      ...(selectedFields.includes('mobile') && { mobile }),
      ...(selectedFields.includes('username') && { username }),
      password,
    };

    console.log('Submitting new password data:', newPasswordData);

    try {
      const response = await axios.post('http://localhost:5000/api/passwords', newPasswordData);
      console.log('Response from server:', response.data);
      onAddPassword(response.data);
      setShowConfirmation(false);
      alert('Password added successfully!');

      // Reset form
      setSelectedFields([]);
      setEmail('');
      setUsername('');
      setPassword('');
      setWebsite('');
      setMobile('');
    } catch (error) {
      console.error('Error adding password:', error);
      setError('Failed to add password. Please try again.');
    }
  };

  const handleCancelSubmission = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="add-password-container">
      <h2>Add New Password</h2>
      <form onSubmit={handleSubmit} className="add-password-form">
        <div className="form-group">
          <label>Select Details to Add:</label>
          <div className="field-selection">
            <label>
              <input
                type="checkbox"
                value="website"
                onChange={() => handleFieldToggle('website')}
                checked={selectedFields.includes('website')}
              />
              Website
            </label>
            <label>
              <input
                type="checkbox"
                value="email"
                onChange={() => handleFieldToggle('email')}
                checked={selectedFields.includes('email')}
              />
              Email
            </label>
            <label>
              <input
                type="checkbox"
                value="mobile"
                onChange={() => handleFieldToggle('mobile')}
                checked={selectedFields.includes('mobile')}
              />
              Mobile
            </label>
            <label>
              <input
                type="checkbox"
                value="username"
                onChange={() => handleFieldToggle('username')}
                checked={selectedFields.includes('username')}
              />
              Username
            </label>
          </div>
        </div>

        {selectedFields.includes('website') && (
          <div className="form-group">
            <label htmlFor="website">Website:</label>
            <input
              type="text"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL"
            />
          </div>
        )}

        {selectedFields.includes('email') && (
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        )}

        {selectedFields.includes('mobile') && (
          <div className="form-group">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>
        )}

        {selectedFields.includes('username') && (
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
        )}

        <div className="form-group password-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <i
            className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} password-visibility-icon`}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="add-btn">Add Password</button>
      </form>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to add this password?</p>
          <div className="confirmation-actions">
            <button onClick={handleConfirmSubmission} className="confirm-btn">Yes</button>
            <button onClick={handleCancelSubmission} className="cancel-btn">No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPassword;