import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogoutClick}>
      Log Out
    </button>
  );
};

export default Logout;