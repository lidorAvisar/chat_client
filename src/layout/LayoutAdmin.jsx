import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from '../components/headers/AdminNav'
import Footer from '../components/footer/Footer'

const LayoutAdmin = () => {
  return (
    <div>
      <AdminNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutAdmin