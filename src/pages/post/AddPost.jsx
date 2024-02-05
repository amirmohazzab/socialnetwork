import React, {useState, useContext, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Navbar from '../../components/navbar/Navbar'
import './post.css'
import { CategoryContext } from '../../context/CategoryContext'
import { PostContext } from '../../context/PostContext'
import './post.css'

const formSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required()
})

const AddPost = () => {

    const {category, getCategory} = useContext(CategoryContext)
    const {addPost, errorPost} = useContext(PostContext)
    
    useEffect(()=> {
        getCategory()
    }, [])

    const [preview, setPreview] = useState("")
    const [file, setFile] = useState([])
    

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const formik = useFormik({
        initialValues: {
            title:"",
            description: "",
            category: "",
            image: ""
        },
        onSubmit: (values) => {
            const data = {
                title: values.title,
                description: values.description,
                category: values.category,
                image: file
            }
            addPost(data)
        },
        validationSchema: formSchema
    })

  return (
    <div className="container tablet mobile">
        <Navbar />
        <div className="columns mt-4 pt-4">
            <div className="column">
                <h1 className='is-size-3 has-text-centered has-text-danger pb-5 pt-5'>{errorPost}</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="post-editor is-flex">
                        <div className="post-editor-right pr-5">
                            <div className="field">
                                <label className='label'> post title </label>
                                <div className="control">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder='your post title'
                                        value={formik.values.title}
                                        onChange={formik.handleChange('title')}
                                        onBlur={formik.handleBlur('title')}
                                    />
                                    <p className='help is-danger'>
                                        {formik.touched.title && formik.errors.title}
                                    </p>
                                </div>
                               
                            </div>
                            <div className="field mt-5">
                                <label className='label'> post content </label>
                                <div className="control">
                                    <ReactQuill 
                                        name='description'
                                        theme="snow"
                                        className='has-background-white'
                                        value={formik.values.description}
                                        onChange={formik.handleChange('description')}
                                        onBlur={formik.handleBlur('description')}

                                    />
                                    {/* <textarea 
                                        className='textarea' 
                                        placeholder='your content'
                                        value={formik.values.description}
                                        onChange={formik.handleChange('description')}
                                        onBlur={formik.handleBlur('description')}
                                    >
                                    </textarea> */}
                                    <p className='help is-danger'>
                                        {formik.touched.description && formik.errors.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="post-editor-left">
                            <div className="field">
                                <label className='label'> post category </label>
                                <div className="select is-fullwidth">
                                    <select 
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange('category')}
                                        onBlur={formik.handleBlur('category')}
                                    >
                                        <option> choose </option>
                                        {
                                            category.map((cat) => (
                                                <option key={cat._id} value={cat.title}> {cat.title} </option>
                                            ))
                                        }
                                    </select>
                                    <p className='help is-danger'>
                                        {formik.touched.category && formik.errors.category}
                                    </p>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className='label'> post pic </label>
                                <div className="control">
                                    <input 
                                        name='image'
                                        type="file" 
                                        className="input"
                                        value={formik.values.image}
                                        onBlur={formik.handleBlur('image')}
                                        onChange={loadImage} 
                                    />
                                    {
                                        preview ? (
                                            <figure className='image-preview mt-3'>
                                                <img src={preview} alt="" className='is-64x64'/>
                                            </figure>

                                        ) : ""
                                    }
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type='submit' className='button is-link'> send post </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddPost
