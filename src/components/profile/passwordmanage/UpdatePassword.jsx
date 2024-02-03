import React, { useContext } from 'react'
import Navbar from '../../navbar/Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../../context/AuthContext'


const formSchema = Yup.object({
    password: Yup.string().min(6, "not less than 6").max(15, "not more than 15").required(),
})

const UpdatePassword = () => {

    const {updatePassword} = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        onSubmit: (values) => {
            updatePassword(values)
        },
        validationSchema: formSchema
    })

  return (
    <div className="container">
        <Navbar />
        <div className="columns is-flex is-align-items-center is-justify-content-center mt-4 pt-4">
            <div className="column is-two-fifths mt-4 pt-4">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='has-text-white is-size-4 has-text-centered mb-6 mt-6'> New Password </h1>
                    <div className="field">
                        <label className="label"> Password </label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                placeholder='your password'
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                            />
                        </div>
                        <p className='help is-danger'>
                            {formik.touched.password && formik.errors.password}
                        </p>
                    </div>
                    <div className="field mt-5">
                        <dov className="control">
                            <button type='submit' className='button is-link is-fullwidth'> Save </button>
                        </dov>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdatePassword
