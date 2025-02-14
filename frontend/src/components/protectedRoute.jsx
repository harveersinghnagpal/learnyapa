import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token) return <Navigate to="/signup" />; // Redirect to login if not logged in
  if (allowedRoles && !allowedRoles.includes(userRole))
    return <Navigate to="/" />; // Redirect to home if role not allowed

  return children;
};

export default ProtectedRoute;
