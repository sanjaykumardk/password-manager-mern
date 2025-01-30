import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddPassword from './components/AddPassword';
import PasswordList from './components/PasswordList';
import Home from './pages/Home';
import RandomPasswordGenerator from './components/RandomPasswordGenerator';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark'); 
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords') || '[]');
    setPasswords(storedPasswords);

    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const addPassword = (passwordData) => {
    const updatedPasswords = [...passwords, passwordData];
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  };

  const deletePassword = (index) => {
    const updatedPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  };

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        {/* Pass theme and toggleTheme to Header */}
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPassword onAddPassword={addPassword} />} />
            <Route path="/list" element={<PasswordList passwords={passwords} onDelete={deletePassword} />} />
            <Route path="/generator" element={<RandomPasswordGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
