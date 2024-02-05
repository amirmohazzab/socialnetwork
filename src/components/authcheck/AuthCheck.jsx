import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthCheck = () => {

    const {userId} = useContext(AuthContext)

    return userId ? <Navigate to='/' /> : <Outlet />
}

export default AuthCheck
