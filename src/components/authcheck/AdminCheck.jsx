import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AdminCheck = () => {

    const {isAdmin} = useContext(AuthContext)
  return isAdmin ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default AdminCheck
