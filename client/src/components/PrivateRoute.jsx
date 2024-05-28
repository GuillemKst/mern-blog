import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

{/*Crear págines privades només per veure al estre registrat */ }
export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    currentUser ?  <Outlet/> : <Navigate to= '/sign-in'/>
  )
};

