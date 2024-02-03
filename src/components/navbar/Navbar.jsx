import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import smlogo from '../../assets/images/smlogo.png'
import { AuthContext } from '../../context/AuthContext'
import {AiOutlineUpload} from 'react-icons/ai'
import './navbar.css'

const Navbar = () => {

    const {userId, profilePhoto, logout} = useContext(AuthContext)
    const [show, setShow] = useState(false)


  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link to="/" className='navbar-item'>
                <img src={smlogo} width="100" alt="" />
            </Link>
            {
                userId && 
                <Link to='/add-post' className='button is-danger mt-4'> Send Post 
                  <AiOutlineUpload className='is-size-3 ml-2'/>
                </Link>
            }
        </div>
        <div className="navbar-end">
            {
                userId ? (
                    <>
                        <span onClick={()=> setShow(!show)} className="is-flex is-align-items-center mr-3"> 
                            <img src={profilePhoto} className= 'img-profile' width='40' alt=''/>
                            {
                                show ?
                                (
                                    <div className='profile'>
                                        <Link to='/profile' className='is-flex is-align-items-center'> Profile </Link>
                                        <Link to='/update-password' className='is-flex is-align-items-center'> Edit Password </Link>
                                        <button onClick={logout} className='is-flex is-align-items-center'> Exit </button>
                                    </div>
                                ) : ""
                            }
                        </span>
                        <Link to="/" className="navbar-item"> Home </Link>
                        <Link to="/add-category" className="navbar-item"> Create Category </Link>
                        <Link to="/users" className="navbar-item"> Users </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-item">
                            Login
                        </Link>
                        <Link to="/register" className="navbar-item">
                            Register
                        </Link>
                    </>
                )
            }
            
        </div>
   </nav>
  )
}

export default Navbar
