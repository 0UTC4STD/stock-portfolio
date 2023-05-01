import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <p>Username is required</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <p>Password is required</p>}

        <input type="submit" />
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
};

export default RegisterPage;