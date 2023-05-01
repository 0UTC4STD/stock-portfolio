import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  const isAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/check-auth', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    isAuthenticatedUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      console.log(response.data);

      // Save the JWT token to the local storage
      localStorage.setItem('token', response.data.token);

      // Reload the page after successful login
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors && errors.username && <p>Username is required</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors && errors.password && <p>Password is required</p>}

        <input type="submit" />
        <Link to="/register">Don't have an account? Register here.</Link>
      </form>
    </div>
  );
};

export default LoginPage;
