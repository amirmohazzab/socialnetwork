import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Navbar from '../../components/navbar/Navbar'
import {BiBookOpen} from 'react-icons/bi'
import ShowCategory from '../../components/category/ShowCategory'
import { CategoryContext } from './../../context/CategoryContext';


const formSchema = Yup.object({
    title: Yup.string().required(),
})

const AddCategory = () => {

    const {createCategory} = useContext(CategoryContext)


    const formik = useFormik({
        initialValues: {
            title: "",
        },
        onSubmit: (values) => {
            createCategory(values)
        },
        validationSchema: formSchema
    })

  return (
    <div className="container">
        <Navbar />
        <div className="category-title has-text-centered mt-6">
            <BiBookOpen className='is-size-1 has-text-white'/>
        </div>

        <div className="columns is-justify-content-center">
            <div className="column is-two-thirds">
                <form onSubmit={formik.handleSubmit} className='mt-6'>
                    <div className="field">
                        <div className="control">
                            <input 
                                type="text" 
                                className='input' 
                                placeholder='Category Name'
                                value={formik.values.title}
                                onChange={formik.handleChange('title')}
                                onBlur={formik.handleBlur('title')}
                            />
                        </div>
                        <p className='help is-danger'>
                            {formik.touched.title && formik.errors.title}
                        </p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type='submit' className='button is-link has-text-weight-bold is-fullwidth mt-6'> Add Category </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <ShowCategory />
    </div>
  )
}

export default AddCategory
