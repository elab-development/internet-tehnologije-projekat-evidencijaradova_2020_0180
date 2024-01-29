// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);


  if (!user.isAuthenticated || user.role !== 'professor') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
