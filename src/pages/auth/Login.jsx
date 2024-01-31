import React, {useContext} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Navbar from '../../components/navbar/Navbar'
import './register.css'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'


const formSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6, "characters must not less than 6").max(15, "characters must not more than 15")
})

const Login = () => {

    const {login, errorLogin} = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            login(values)
        },
        validationSchema: formSchema
    })

  return (
    <div className='container'>
      <Navbar />
      <div className="columns is-flex is-align-items-center auth">
        <div className="column is-two-fifths">
            <form onSubmit={formik.handleSubmit} className='has-background-dark box p-6'>
                <h1 className='has-text-white has-text-centered is-size-4 mb-6'> Login </h1>
                <h1 className='has-text-danger has-text-centered is-size-5 mb-4'> {errorLogin} </h1>
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
                   <button type='submit' className='button is-success is-fullwidth mt-5'> Login </button>
                </div>
                <Link to='/' className='has text-white mt-4 is-flex' > Forgot Password </Link>
            </form>
        </div>
        <div className="column is-three-fifths">
            <h1 className='has-text-centered has-text-weight-bold has-text-light is-size-1 mb-6'> Welcome to your Home </h1>
        </div>
      </div>
    </div>
  )
}

export default Login
