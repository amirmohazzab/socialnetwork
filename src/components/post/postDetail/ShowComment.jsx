import React, {useContext, useState} from 'react'
import {BsFillTrash2Fill, BsFillChatSquareDotsFill} from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { CommentContext } from '../../../context/CommentContext'

const ShowComment = ({comment}) => {

    const {id} = useParams()

    const {updateComment, deleteComment} = useContext(CommentContext)

    const [showComment, setShowComment] = useState(false)
    const [editComment, setEditComment] = useState({
        description: ""
    })

    const handleChange = (e) => {
        setEditComment((prev) => ({...prev, [e.target.name]: e.target.value}))
    }


    const handleClick = async(e) => {
        e.preventDefault()
        await updateComment(editComment)
        setShowComment(false)
    }

    
    if (comment.length === 0) {
        return  <div className="box mt-6">
                    No Comments to show
                </div>
    }

  return (
    <div className="comment-list mt-6 pb-6">
        {
            comment?.map((com) => (
                <div className="box" key={com._id}>
                    <div className="comment is-flex is-justify-content-space-between">
                        <div className="comment-desc">
                            {com.description}
                        </div>
                        <div className='is-flex'>
                            <span>
                                <BsFillTrash2Fill 
                                    className='is-size-5 has-text-danger is-clickable mr-3'
                                    onClick={()=> deleteComment({commentId: com._id, postId: id})}
                                />
                            </span>
                            <span onClick={()=> setShowComment(!showComment)}>
                                <BsFillChatSquareDotsFill 
                                    className='is-size-5 has-text-success is-clickable'
                                    onClick={()=> setEditComment({commentId: com._id, postId: id})}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            ))
        }


        {
            showComment ? (
                <div className="comment-edit">
                    <form onSubmit={handleClick}>
                        <input 
                            type="text" 
                            className="input pt-5 pb-5" 
                            name='description'
                            placeholder='edit your comment'
                            onChange={handleChange}
                        />
                        <button type='submit' className='button is-success mt-4'> Edit Comment </button>
                    </form>
                </div>
            ) : ""
        }
        

    </div>
  )
}

export default ShowComment
