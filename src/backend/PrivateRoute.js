import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;