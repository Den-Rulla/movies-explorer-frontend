import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {

  return props.isAuth ? (
    <Outlet/>
  ) : (
    <Navigate to='/' replace />
  );
};

export default ProtectedRoute;
