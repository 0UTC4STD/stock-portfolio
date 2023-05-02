import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
    navigate('/login');
  };

  return (
    <a href="/" onClick={handleLogoutClick}>
      Log Out
    </a>
  );
};

export default Logout;