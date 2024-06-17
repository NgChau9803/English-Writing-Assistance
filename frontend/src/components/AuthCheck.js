import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthCheck = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Ensure 'authToken' is used
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthCheck;
