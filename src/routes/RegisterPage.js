import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/register', data);
      console.log(response.data);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-box">
        <div className="register-header">
          <h1>Courtemanche Financial</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && <p>Username is required</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Password is required</p>}

          <input className="register-submit" type="submit" value="Register" />
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;