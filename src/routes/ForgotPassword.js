import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div>
      <h1>Oh tough break, looks like you'll need to make a new account!</h1>
      <Link to="/register">Register Here</Link>
    </div>
  );
};

export default ForgotPassword;