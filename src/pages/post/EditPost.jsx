import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CategoryContext } from './../../context/CategoryContext';
import Navbar from '../../components/navbar/Navbar'
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';

const formSchema = Yup.object({
    title: Yup.string().required(),
    category: Yup.string().required(),
    description: Yup.string().required()
})

const EditPost = () => {

    const {state} = useLocation()
    const {category, getCategory} = useContext(CategoryContext)
    const {userId} = useContext(AuthContext)
    const {editPost} = useContext(PostContext)
 
    useEffect(()=> {
        getCategory()
    }, [])

    const formik = useFormik({
        initialValues: {
            title: state.title,
            category: state.category,
            description: state.description,
            id: state._id,
            user: userId
        },
        onSubmit: (values) => {
            editPost(values)
        },
        validationSchema: formSchema
    })

    
  return (
    <div className="container">
        <Navbar />
        <h1 className='has-text-white mt-4 is-size-2 has-text-centered'> Edit Post</h1>
        <div className="columns is-justify-content-center mt-4">
            <div className="column is-half">
                <form onSubmit={formik.handleSubmit}>
                    <div className="field mt-4">
                        <label htmlFor="" className="label"> Post title </label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                placeholder='your post title'
                                defaultValue={state.title}
                                onChange={formik.handleChange('title')}
                                onBlur={formik.handleBlur('title')}
                            />
                            <p className='help is-danger'>
                                {formik.touched.title && formik.errors.title}
                            </p>
                        </div>
                    </div>
                    <div className="field mt-4">
                        <label htmlFor="" className="label"> Post category </label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select 
                                    name="category"
                                    defaultValue={state.category}
                                    onChange={formik.handleChange('category')}
                                    onBlur={formik.handleBlur('category')}
                                >
                                    {
                                        category?.map(cat => (
                                            <option value={cat.title} key={cat._id}> {cat.title} </option>
                                        ))
                                    }
                                </select>
                                <p className='help is-danger'>
                                    {formik.touched.category && formik.errors.category}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field mt-6">
                        <label htmlFor="" className="label"> Post content </label>
                        <div className="control">
                            <textarea 
                                name="description" 
                                className='textarea' 
                                placeholder='your post content'
                                defaultValue={state.description}
                                onChange={formik.handleChange('description')}
                                onBlur={formik.handleBlur('description')}
                            ></textarea>
                            <p className='help is-danger'>
                                {formik.touched.description && formik.errors.description}
                            </p>
                        </div>
                    </div>
                    <div className="field mt-4">
                        <div className="control">
                            <button type='submit' className='button is-link'> Edit Post </button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default EditPost
