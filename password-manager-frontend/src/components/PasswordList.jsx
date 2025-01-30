import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PasswordList.css';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/passwords');
      setPasswords(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setError('Failed to fetch passwords. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePassword = async (id) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/passwords/${id}`);
      setPasswords(passwords.filter(password => password._id !== id));
      alert('Password deleted successfully!');
    } catch (error) {
      console.error('Error deleting password:', error);
      setError('Failed to delete password. Please try again.');
    }
  };

  const confirmDeletion = (id) => {
    setConfirmDelete(id);
  };

  const cancelDeletion = () => {
    setConfirmDelete(null);
  };

  const confirmDeletionHandler = () => {
    if (confirmDelete) {
      handleDeletePassword(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="password-list-container">
      <h2 className="password-list-title">Stored Passwords</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <table className="password-table">
        <thead>
          <tr>
            <th>Website</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map(password => (
            <tr key={password._id}>
              <td>{password.website || 'N/A'}</td>
              <td>{password.email || 'N/A'}</td>
              <td>{password.mobile || 'N/A'}</td>
              <td>{password.username || 'N/A'}</td>
              <td>{password.password || 'N/A'}</td>
              <td>
                <button onClick={() => confirmDeletion(password._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDelete && (
        <div className="confirmation-dialog">
          <div className="dialog-box">
            <p>Are you sure you want to delete this password?</p>
            <div className="dialog-actions">
              <button className="confirm-btn" onClick={confirmDeletionHandler}>Yes</button>
              <button className="cancel-btn" onClick={cancelDeletion}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordList;