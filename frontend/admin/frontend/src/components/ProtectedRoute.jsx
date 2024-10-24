import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Element {...rest} /> : <Navigate to="/auth/login" />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;