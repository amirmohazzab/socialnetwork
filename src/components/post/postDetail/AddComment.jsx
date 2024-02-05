import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './comment.css'
import { useParams } from 'react-router-dom'
import { CommentContext } from '../../../context/CommentContext'


const formSchema = Yup.object({
    description: Yup.string().required(),
})

const AddComment = () => {

    const {id} = useParams();
    const {createComment, errorComment} = useContext(CommentContext)

    
    const formik = useFormik({
        initialValues: {
            description: "",
        },
        onSubmit: (values) => {
            const data = {
                postId: id,
                description: values.description
            }
            createComment(data)
        },
        validationSchema: formSchema
    })

  return (
    <form onSubmit={formik.handleSubmit}>
        <h1 className='is-size-3 has-text-centered has-text-danger pb-5 pt-5'>{errorComment}</h1>
        <div className="field">
            <label className="label"> Add Comment </label>
            <div className="control">
                <textarea 
                    name="description" 
                    placeholder='Add your comment' 
                    className='textarea textarea-comment'
                    value={formik.values.description}
                    onChange={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                ></textarea>
                <p className='help is-size-6 mb-4 is-danger'>
                    {formik.touched.description && formik.errors.description}
                </p>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <button type='submit' className='button is-link'> Send </button>
            </div>
        </div>
    </form>
  )
}

export default AddComment
