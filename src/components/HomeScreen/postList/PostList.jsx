import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { PostContext } from '../../../context/PostContext'
import {AiOutlineEye, AiFillLike, AiTwotoneDislike} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const PostList = () => {

  const {getPosts, posts, likePost, disLikePost} = useContext(PostContext)

  useEffect(()=> {
    getPosts()
  }, [])
  
  
  return (
    <>
      {
        posts?.map((post) => (
          <div className="box" key={post._id}>
  <article className="media">
    <div className="media-left">
      <figure className="image is-64x64">
        <img src={post?.user?.profilePhoto} alt="Image" className='img-profile'/>
      </figure>
    </div>
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
    </>
  )
}

export default PostList
