import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token);
  console.log('ProtectedRoute - Token:', token);
  return token ? <Outlet /> : <Navigate to="/Login" replace />;
}

export default ProtectedRoute;