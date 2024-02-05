import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineUpload } from "react-icons/ai";
import "./navbar.css"
import { useState } from "react";
const Navbar = () => {
  const {userId,profilePhoto,logout,isAdmin} = useContext(AuthContext)
  const [show, setShow] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
     
      <div className="navbar-start">

      {
        userId ? 
          <>
          <span onClick={()=> setShow(!show)} className="is-flex is-align-items-center ml-3">
            <img src={profilePhoto} className="img-profile" width="40" alt="" />
          {
            show ?
            <div className="profile">
            <Link to="/profile" className="is-flex is-align-items-center"> Profile </Link>
            <Link to="/update-password" className="is-flex is-align-items-center"> Edit Password </Link>
            <button onClick={logout} className="is-flex is-align-items-center">Exit </button>
          </div>
            :
            ""
          }
          </span>
            <Link to="/" className="navbar-item">Home </Link>
            {
              isAdmin ?
              <>
                <Link to="/add-category" className="navbar-item"> Create Category </Link>
            <Link to="/users" className="navbar-item"> Users </Link>
              </>
              :
              ""
            }
          
          </>
        :
      <>
        <Link to="/login" className="navbar-item">
        Login
      </Link>

      <Link to="/register" className="navbar-item">
         Register
      </Link>
      </>
      }

     
      </div>

      <div className="navbar-brand">
        {userId && 
          <Link to="/add-post" className="button is-danger mt-4"> Send Post
          <AiOutlineUpload className="is-size-3 mr-2" />
          </Link>
        }
      </div>
      
    </nav>
  );
};

export default Navbar;
