import React from 'react'
import { Link } from 'react-router-dom'
import smlogo from '../../assets/images/smlogo.png'

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link to="/" className='navbar-item'>
                <img src={smlogo} width="100" alt="" />
            </Link>
        </div>
        <div className="navbar-end">
            <Link to="/login" className="navbar-item">
            Login
            </Link>
            <Link to="/register" className="navbar-item">
                Register
            </Link>
        </div>
   </nav>
  )
}

export default Navbar
