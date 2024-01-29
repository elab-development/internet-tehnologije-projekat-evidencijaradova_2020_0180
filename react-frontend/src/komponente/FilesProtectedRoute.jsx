// FilesProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const FilesProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user.isAuthenticated && (user.role === 'professor' || user.role === 'student')) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default FilesProtectedRoute;
