import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import { current } from '@reduxjs/toolkit'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'

{/*Mostrar Components segons els params de URLS*/}
export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search]); 
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 '>
        {/*Sidebar*/}
        <DashSidebar/>
      </div>
      {/*Profile...*/}
      {tab === 'profile' && <DashProfile/>} {/* Condició per mostrar components al complir la condició del parametre*/}
      {tab === 'posts' && <DashPosts/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'comments' && <DashComments/>}
    </div>
  )
}
