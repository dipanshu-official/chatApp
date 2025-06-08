import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const {user , loading} = useAuth()
  if(loading) return <div>Loading .....</div>;
  return user ? <Outlet/> : <Navigate to='/login'/>
 
}

export default PrivateRoute
