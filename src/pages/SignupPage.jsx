import React from 'react';
import './PageStyles.css';

const SignupPage = () => {
  return (
    <div className="page-container">
      <h2>Sign Up</h2>
      <form className="form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;