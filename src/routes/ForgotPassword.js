import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-text">Oh tough break, looks like you'll need to make a new account!</h2>
      <Link to="/register" className="register-btn">Register Here</Link>
    </div>
  );
};

export default ForgotPassword;