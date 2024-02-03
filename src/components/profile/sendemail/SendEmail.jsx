import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Navbar from '../../navbar/Navbar'
import { AuthContext } from '../../../context/AuthContext'

const formSchema = Yup.object({
    subject: Yup.string().required(),
    description: Yup.string().required(),
})

const SendEmail = () => {

    const {sendEmail} = useContext(AuthContext)
    const {state} = useLocation()

    const formik = useFormik({
        initialValues: {
            email: state,
            subject: "",
            description: ""
        },
        onSubmit: (values) => {
            const data = {
                email: values.email,
                subject: values.subject,
                description: values.description
            }
            sendEmail(data)
        },
        validationSchema: formSchema
    })

  return (
   <div className="container">
    <Navbar />
    <h1 className='is-size-3 mt-4 has-text-centered has-text-white'> Send Email</h1>
    <div className="columns mt-4 is-justify-content-center">
        <div className="column is-half">
            <form onSubmit={formik.handleSubmit}>
                <div className="field mt-5">
                    <label className="label"> Receiver Email </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input'
                            placeholder='Receiver Email'
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            disabled
                        />
                    </div>
                </div>
                <div className="field mt-5">
                    <label className="label"> Subject </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input'
                            placeholder='Subject'
                            value={formik.values.subject}
                            onChange={formik.handleChange('subject')}
                            onBlur={formik.handleBlur('subject')}
                        />
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.subject && formik.errors.subject}
                    </p>
                </div>
                <div className="field mt-5">
                    <label className="label"> Message </label>
                    <div className="control">
                        <textarea
                            type="text" 
                            className='textarea'
                            placeholder='Your Message'
                            value={formik.values.description}
                            onChange={formik.handleChange('description')}
                            onBlur={formik.handleBlur('description')}
                        >
                        </textarea>
                    </div>
                    <p className='help is-danger'>
                        {formik.touched.description && formik.errors.description}
                    </p>
                </div>
                <div className="field mt-5">
                    <div className="control">
                        <button type='submit' className='button is-link' > Send Message </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
   </div>
  )
}

export default SendEmail
