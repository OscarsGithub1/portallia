// PrivateRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from './authUtils'; // Adjust the import path based on where you place the file

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') && isTokenValid();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;