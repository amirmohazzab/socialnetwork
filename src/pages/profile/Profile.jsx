import React, {useContext, useEffect, useRef, useState} from 'react'
import Navbar from './../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import {BsFillExclamationTriangleFill, BsFillEmojiFrownFill, BsHeart, BsFillPencilFill, BsWalletFill} from 'react-icons/bs'
import {AiOutlineEye, AiFillLike, AiTwotoneDislike} from 'react-icons/ai'
import {BiImport} from 'react-icons/bi'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { PostContext } from '../../context/PostContext';
import './profile.css'

const Profile = () => {

    const {Profile, userData, userId, profilePhotoUpload, verifyUser} = useContext(AuthContext)
    const {likePost, disLikePost} = useContext(PostContext)

    const [file, setFile] = useState("")
    const [showBtn, setShowBtn] = useState(false)
    
    const inputRef = useRef(null)

    const handleClick = () => {
        inputRef.current.click()
        setShowBtn(!showBtn)
    }

    const loadImage = async() => {
        profilePhotoUpload(file)
    }

    useEffect(()=> {
        Profile()
    }, [])

  
  return (
    <div className="container">
        <Navbar />

        {
            !userData.isAccountVerified ? (
                <div className="not-verified has-background-danger is-size-5 is-flex is-align-items-center">
                    <h1 className='p-3 has-text-warning is-flex is-align-items-center'>
                        <BsFillExclamationTriangleFill className='mr-2'/> Your account not verified
                        <button onClick={verifyUser} className='is-size-6 has-text-white ml-2 button is-info'> click for verification </button>
                    </h1>

                </div>
            ) : ""
        }

        <div className="columns mt-6">
            <div className="column has-background-white">
                <div className="profile-information is-flex is-align-items-end">
                    <div className="profile-photo is-flex">
                        <div className="profile">
                            <img src={userData.profilePhoto} width="100" alt="" />
                            <button className='upload-profile' onClick={handleClick}> <BiImport /> </button>
                            <input 
                                type="file" 
                                name="file" 
                                ref={inputRef} 
                                onChange={e => setFile(e.target.files[0])}
                                hidden
                            />
                            
                            {showBtn ? <button className='button is-small' onClick={loadImage}> Upload </button> : ""}
                        </div>
                        <div className="account-verify pl-5">
                            {
                                userData?.isAccountVerified ? (
                                    <div className='has-background-success box mb-0 p-1 has-text-centered has-text-white'>
                                        Account verified
                                    </div>
                                ) : (
                                    <div className='has-background-danger box mb-0 p-1 has-text-centered'>
                                        Account not verified
                                    </div>
                                )
                            }
                            <div className='is-flex is-size-4 mt-4'>
                                <div>{userData.firstName}</div>
                                <div className='ml-1'>{userData.lastName}</div>
                            </div>
                            <div className="profile-info mt-3">
                                Member from : {moment(userData.createdAt).format("YYYY-MM-DD")}
                            </div>
                            <div className='total-follow mt-3 is-flex'>
                                <div className='ml-4'>
                                    {userData?.posts?.length} Posts
                                </div>
                                <Link to='/followers' state={userData.followers} className='ml-4'> {userData?.followers?.length} Followers </Link>
                                <Link to='/following' state={userData.following} className='ml-4'> {userData?.following?.length} Followings </Link>
                            </div>
                        </div>
                    </div>

                            <div className='profile-update'>
                                <button className='is-flex is-align-items-center is-size-6 ml-3 button is-warning'>
                                    <Link to='/user/update' className='mr-2' state={userData}>
                                        Edit Profile
                                    </Link>
                                    <BsFillPencilFill />
                                </button>
                            </div>

                            
                </div>
                { userData.bio && <div className='mt-6 mr-6'> About me: {userData.bio} </div>}
            </div>
        </div>

        <div className='columns pt-4 mt-6 has-background-white'>
            <div className="column is-three-quarters">
            {
        userData?.posts?.map((post) => (
          <div className="box" key={post._id}>
  <article className="media">
    <div className="media-content">
      <div className="content">
        <div className='is-flex is-justify-content-space-between mb-5'>
          <strong>{post.user.firstName}</strong>
          <strong> {moment(post.createdAt).format("YYYY-MM-DD")} </strong>
        </div>
        <Link to={`/detail-post/${post._id}`}>
          <figure className='image is-128x128'>
            <img src={post?.image} />
          </figure>
          <p> {post.title} </p>
        </Link>
      </div>
      <nav className="level is-mobile is-align-items-center">
        <div className="level-left">
            <a className="level-item">
              <span className='is-small is-flex is-align-items-center'> 
                <AiOutlineEye className='is-size-4 has-text-dark' />
                <span className='has-text-dark is-size-6 ml-1'> 
                  {post?.numViews ? (post.numViews) : "no view" } 
                </span>
              </span>
            </a>
        </div>
        <div className="level-right">
            <a className="level-item">
              <span className='is-small is-flex is-align-items-center'> 
                <AiTwotoneDislike className='is-size-4 has-text-danger' onClick={()=> disLikePost(post._id)} />
                <span className='has-text-danger is-size-4 ml-1'> 
                  {post?.disLikes?.length } 
                </span>
              </span>
            </a>
            <a className="level-item ml-2">
              <span className='is-small is-flex is-align-items-center'> 
                <AiFillLike className='is-size-4' onClick={()=> likePost(post._id)}/>
                <span className='is-size-4 ml-1'> 
                  {post?.likes?.length } 
                </span>
              </span>
            </a>
        </div>
      </nav>
    </div>
  </article>
    </div>
        ))
      }

            </div>
            <div className="column is-one-quarters">
                <h1 className='is-size-4 mb-5'>Recent visitors</h1>
                <ul>
                    {
                        userData?.viewedBy?.map((user, index) => (
                            <li key={index} className='mb-5'>
                                <Link to={`/profile/${user._id}`} className='is-flex is-align-items-center'>
                                    <div className="avatar">
                                        <img src={user.profilePhoto} width='60' alt="" />
                                    </div>
                                    <div className="username ml-2">
                                        <h1 className='is-size-5 has-text-dark'> {user.firstName} </h1>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
       
    </div>
  )
}

export default Profile
