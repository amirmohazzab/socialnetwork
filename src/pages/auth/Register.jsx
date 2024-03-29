import React, {useContext} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Navbar from '../../components/navbar/Navbar'
import './register.css'
import { AuthContext } from '../../context/AuthContext'


const formSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6, "characters must not less than 6").max(15, "characters must not more than 15")
})

const Register = () => {

    const {register, errorRegister} = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            register(values)
        },
        validationSchema: formSchema
    })

  return (
    <div className='container'>
      <Navbar />
      <div className="columns is-flex is-align-items-center auth">
        <div className="column is-two-fifths">
            <form onSubmit={formik.handleSubmit} className='has-background-dark box p-6'>
                <h1 className='has-text-white has-text-centered is-size-4 mb-6'> Register </h1>
                <h1 className='has-text-danger has-text-centered is-size-5 mb-4'> {errorRegister} </h1>
                <div className="field">
                    <label className="label"> First Name </label>
                    <div className="control">
                        <input 
                            type="text" 
                            name='firstName'
                            className='input'
                            placeholder='Your first name'
                            value={formik.values.firstName}
                            onChange={formik.handleChange('firstName')}
                            onBlur={formik.handleBlur('firstName')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.firstName && formik.errors.firstName}
                    </p>
                </div>
                <div className="field">
                    <label className="label"> Last Name </label>
                    <div className="control">
                        <input 
                            type="text" 
                            name='lastName'
                            className='input'
                            placeholder='Your last name'
                            value={formik.values.lastName}
                            onChange={formik.handleChange('lastName')}
                            onBlur={formik.handleBlur('lastName')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.lastName && formik.errors.lastName}
                    </p>
                </div>
                <div className="field">
                    <label className="label"> Email </label>
                    <div className="control">
                        <input 
                            type="email" 
                            name='email'
                            className='input'
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.email && formik.errors.email}
                    </p>
                </div>
                <div className="field">
                    <label className="label"> Password </label>
                    <div className="control">
                        <input 
                            type="password" 
                            name='password'
                            className='input'
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.password && formik.errors.password}
                    </p>
                </div>
                <div className="field">
                   <button type='submit' className='button is-success is-fullwidth mt-5'> Register </button>
                </div>
            </form>
        </div>
        <div className="column is-three-fifths">
            <h1 className='has-text-centered has-text-weight-bold has-text-light is-size-1 mb-6'> Welcome to our big society </h1>
            <h2 className='has-text-centered has-text-light is-size-3'> Register</h2>
        </div>
      </div>
    </div>
  )
}

export default Register
