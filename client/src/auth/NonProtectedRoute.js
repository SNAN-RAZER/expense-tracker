import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const NonProtectedRoute = () => {
  const user = localStorage.getItem('shey-money');
  return user?<Navigate to='/' />:<Outlet />;
}

export default NonProtectedRoute