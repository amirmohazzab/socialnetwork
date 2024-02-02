import React, { useContext } from 'react'
import './follow.css'
import Navbar from '../navbar/Navbar'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const Followers = () => {

  const {state} = useLocation()

  const {profilePhoto} = useContext(AuthContext);

  return (
    <div className="container">
      <Navbar />
      <div className="columns has-background-white mt-6">
        <div className="column box mb-0 has-text-centered is-flex is-flex-direction-column is-align-items-center is-one-quarter">
          <h1 className='is-size-4 has-text-centered mb-4'> Your Followers </h1>
          <img src={profilePhoto} className="is-128x128" alt="" />
        </div>
        <div className="column is-three-quarter">
          <div className="columns">
            {state && state.map((item) => (
                <div className="follower column is-one-fifth" key={item._id} >
                  <div className="img has-text-centered">
                    <img src={item.profilePhoto} width="100" alt="" />
                    <div className="follower-user">
                      <h3 className='has-text-centered'> {item.firstName} </h3>
                    </div>
                  </div>
                  <div className='view-profile has-text-centered'>
                    <Link to={`/profile/${item._id}`} className='has-text-success'> Visite </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Followers
