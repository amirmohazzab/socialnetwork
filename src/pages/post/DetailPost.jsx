import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import {BsChevronRight} from 'react-icons/bs'
import { PostContext } from '../../context/PostContext'
import Navbar from '../../components/navbar/Navbar'
import {RiDeleteBinLine, RiImageEditFill} from 'react-icons/ri'
import './post.css'
import AddComment from '../../components/post/postDetail/AddComment'
import ShowComment from '../../components/post/postDetail/ShowComment'

const DetailPost = () => {

    const {id} = useParams()
    const {detailPost, singlePost, deletePost} = useContext(PostContext)

    const [addComment, setAddComment] = useState(false)
    const [showComment, setShowComment] = useState(false)

    
    useEffect(()=> {
        detailPost(id)
    }, [])

    
  return (
    <div className='container'>
        <Navbar />
        <div className="bread-crump mt-2 has-text-white pt-6 pl-6 is-flex is-align-items-center">
            Social Network <BsChevronRight className='mr-3 ml-3' /> Posts <BsChevronRight className='mr-3 ml-3' /> {singlePost.category}
        </div>

        <div className="single-post">
            <div className="single-post-title mt-4 is-flex is-justify-content-space-between is-align-items-center">
                <h1 className='is-size-2 has-text-white mt-6 single-title'> {singlePost.title} </h1>
                <strong className='has-text-white'> {moment(singlePost.createdAt).format("YYYY-MM-DD")} </strong>
            </div>
        </div>

        <div className="columns mt-6">
            <div className="column is-three-fifths">
                    <div className="content mb-6">
                        <div className='is-flex is-justify-content-space-between mb-5'>
                            <strong>
                                <div className="post-detail-user">
                                    <div className="author is-flex is-align-items-center">
                                        <div className="image is-64x64">
                                            <img src={singlePost?.user?.profilePhoto} alt="" />
                                        </div>
                                        <div>
                                            <h3 className='has-text-white ml-2 mb-0'> {singlePost?.user?.firstName} </h3>
                                        </div>
                                    </div>
                                </div>
                            </strong>
                            <div className="edit-post mt-3 mb-3">
                                <Link to={`/edit-post/${singlePost._id}`} state={singlePost}> <RiImageEditFill className='is-size-3 has text-success mr-3'/> </Link>
                                <span onClick={()=> deletePost(singlePost._id)}> <RiDeleteBinLine className='is-size-3 has-text-danger is-clickable'/> </span>
                            </div>
                        </div>
                        <div className="single-desc">
                            <p className="is-size-5 has-text-white"> {singlePost.description} </p>
                        </div>
                    </div>
            </div>
            <div className="column is-two-fifths">
                <img src={singlePost.image} alt="" />
            </div>
        </div>

        <div className="button-comment mt-6 mb-6">
            <button className='button is-success is-medium' onClick={()=> setAddComment(!addComment)}> Add Comment </button>
            <button className='button is-info is-medium ml-4' onClick={()=> setShowComment(!showComment)}> Show Comment </button>
        </div>

        { addComment ? <AddComment /> : ""}

        { showComment ? <ShowComment comment = {singlePost.comments} /> : ""}
    </div>
  )
}

export default DetailPost
