import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const VerifyAccount = () => {

    const {id} = useParams()
    const {verifyAccount, errorVerifyAccount } = useContext(AuthContext)

    useEffect(()=> {
        verifyAccount(id)
    }, [])

    console.log(id)

    // if (errorVerifyAccount) {
    //     return (
    //         <div className='pt-4 mt-4 has-text-centered'>
    //             <h1 className='has-text-white is-size-3'> {errorVerifyAccount} </h1>
    //             <Link to='/profile' className='button is-link is-size-3 mt-6'> Resend confirmation email </Link>
    //         </div>
    //     )
    // }

    return (
        <div className='pt-4 mt-4 has-text-centered'>
        <h1 className='has-text-white is-size-3'> your account verified </h1>
        <Link to='/profile' className='button is-link is-size-3 mt-6'> go to profile </Link>
        </div>
    )
}

export default VerifyAccount
