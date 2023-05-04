import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProfilePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.put('/api/update-profile', data, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUpdateSuccess(true);
        }
      }
    } catch (error) {
      console.error(error);
      setUpdateSuccess(false);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="currentUsername">Current Username</label>
        <input
          name="currentUsername"
          placeholder="Current Username"
          {...register("currentUsername", { required: true })}
        />
        {errors && errors.currentUsername && <p>Current Username is required</p>}

        <label htmlFor="newUsername">New Username</label>
        <input
          name="newUsername"
          placeholder="New Username"
          {...register("newUsername", { required: true })}
        />
        {errors && errors.newUsername && <p>New Username is required</p>}

        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          {...register("currentPassword", { required: true })}
        />
        {errors && errors.currentPassword && <p>Current Password is required</p>}

        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          {...register("newPassword", { required: true })}
        />
        {errors && errors.newPassword && <p>New Password is required</p>}

        <input type="submit" value="Update Profile" />
      </form>
      {updateSuccess && <p>Profile updated successfully</p>}
    </div>
  );
};

export default ProfilePage;