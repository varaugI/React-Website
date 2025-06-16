// components/Header.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/" className="logo">🌟 MySite</Link>
      <nav className="nav-links">
        {!user ? (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-button">Profile</Link>
            <button onClick={logout} className="nav-button">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
