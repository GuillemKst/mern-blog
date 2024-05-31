import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

{/*Crear págines privades només per veure al estre registrat */ }
export default function OnlyAdminPrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    currentUser && currentUser.isAdmin ?  <Outlet/> : <Navigate to= '/sign-in'/>
  )
};



