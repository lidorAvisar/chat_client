import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNav from '../components/headers/UserNav'
import Footer from '../components/footer/Footer'

const LayoutUser = () => {
  return (
    <div>
      <UserNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutUser