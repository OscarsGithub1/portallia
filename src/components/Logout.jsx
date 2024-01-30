import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear token and other authentication-related information
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');

    // Redirect to login or another appropriate page
    history.push('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
