import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Navbar from '../../components/navbar/Navbar'
import { AuthContext } from '../../context/AuthContext'




const formSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    bio: Yup.string().required(),
})

const UpdateProfile = () => {

   const {state} = useLocation();
   const {profileUpdate} = useContext(AuthContext)
   

    const formik = useFormik({
        initialValues: {
            firstName: state.firstName,
            lastName: state.lastName,
            bio: state.bio
        },
        onSubmit: (values) => {
            profileUpdate(values)
        },
        validationSchema: formSchema
    })

  return (
    <div className="container">
    <Navbar />
   
    <div className="columns is-justify-content-center">
        <div className="column is-half">
            <form onSubmit={formik.handleSubmit} className='mt-6'>
                <div className="field">
                    <label className="label"> Your name </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input' 
                            placeholder='your Name'
                            defaultValue={state.firstName}
                            onChange={formik.handleChange('firstName')}
                            onBlur={formik.handleBlur('firstName')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.firstName && formik.errors.firstName}
                    </p>
                </div>
                <div className="field">
                <label className="label"> Your last name </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input' 
                            placeholder='Your last Name'
                            defaultValue={state.lastName}
                            onChange={formik.handleChange('lastName')}
                            onBlur={formik.handleBlur('lastName')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.lastName && formik.errors.lastName}
                    </p>
                </div>
                <div className="field">
                <label className="label"> About you</label>
                    <div className="control">
                        <textarea 
                            type="text" 
                            className='textarea' 
                            placeholder='About you'
                            defaultValue={state.bio}
                            onChange={formik.handleChange('bio')}
                            onBlur={formik.handleBlur('bio')}
                        ></textarea>
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.bio && formik.errors.bio}
                    </p>
                </div>
                <div className="field">
                    <div className="control">
                        <button type='submit' className='button is-link has-text-weight-bold is-fullwidth mt-6'> Edit Profile </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default UpdateProfile
