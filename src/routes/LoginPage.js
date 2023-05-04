import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();

  // Add a new state variable for invalid credentials
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      console.log(response.data);

      // Save the JWT token to the local storage
      localStorage.setItem('token', response.data.token);

      // Set the isAuthenticated state in the App component
      setIsAuthenticated(true);

      // Navigate to the home page after successful login
      navigate('/');
    } catch (error) {
      console.error(error);
      // Set invalidCredentials state to true when login fails
      setInvalidCredentials(true);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Courtemanche Financial</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors && errors.username && <p>Username is required</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors && errors.password && <p>Password is required</p>}

          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          
          <input className="login-submit" type="submit" value="Login" />
          
       
          {invalidCredentials && <p className="invalid-credentials">Invalid Username/Password</p>}
        </form>
        <div className="register-link">
          <Link to="/register">Don't have an account? Register here.</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
