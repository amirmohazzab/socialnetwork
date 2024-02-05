import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { AuthContext } from '../../context/AuthContext'
import './users.css'
import { Link } from 'react-router-dom'
import { FaMessage } from "react-icons/fa6";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { TbLock } from "react-icons/tb";
import { TbLockOpen } from "react-icons/tb";


const Users = () => {

    const {getUsers, users, blockUser, unBlockUser} = useContext(AuthContext)

    useEffect(()=> {
        getUsers()
    }, [])

  return (
    <div className="container mobile">
        <Navbar />
        <div className="columns mt-6">
            <div className="column">
                <table className="table table-user is-fullwidth">
                    <thead>
                        <tr>
                            <th> No </th>
                            <th> firstName </th>
                            <th> lastName </th>
                            <th> Email</th>
                            <th> Follow </th>
                            <th> Message </th>
                            <th> Checking </th>
                            <th> State </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index+1}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.followers?.length}</td>
                                    <td>
                                        <Link 
                                            state={user.email} 
                                            to='/user/send-email' 
                                            className='button is-link'
                                        > 
                                            <FaMessage className='mr-1'/> <p> Message </p> 
                                        </Link>
                                    </td>
                                    <td>
                                        <Link 
                                            to={`/profile/${user._id}`} 
                                            className='button is-success'
                                        > 
                                            <RiAccountPinCircleFill className='mr-1' /> <p> Profile </p> 
                                        </Link>
                                    </td>
                                    <td>
                                        {
                                            user.isBlocked ? (
                                                <button onClick={()=>unBlockUser(user._id)} className='button is-dark'> 
                                                    <TbLockOpen className='mr-1' /> <p> Remove Block </p> 
                                                </button>
                                            ) : (
                                                <button onClick={()=>blockUser(user._id)} className='button is-danger'>
                                                    <TbLock className='mr-1' /> <p> Block </p>
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Users
