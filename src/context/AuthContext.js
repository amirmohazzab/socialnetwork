import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { successMessage } from "../utils/message";
import { baseUrl } from './../utils/baseUrl';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [errorRegister, setErrorRegister] = useState([])
    const [errorLogin, setErrorLogin] = useState([])
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [expire, setExpire] = useState("")
    const [profilePhoto, setProfilePhoto] = useState(null)

    const navigate = useNavigate()

    useEffect(()=> {
        refreshToken()
    }, [])

    const refreshToken = async() => {
        try {
            const response = await axios.get(`${baseUrl}/token`)
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setUserId(decoded.userId)
            setExpire(decoded.exp)
            setProfilePhoto(decoded.profilePhoto)
            navigate('/')
        } catch (error) {
            console.log(error)
            navigate('/login', {replace: true})
        }
    }



    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get(`${baseUrl}/token`);
                config.headers.Authorization = `Bearer ${response.data.accessToken}`
                setToken(response.data.accessToken)
                const decoded = jwtDecode(response.data.accessToken);
                //setName(decoded.name);
                setUserId(decoded.userId);
                //setAdmin(decoded.isAdmin);
                setExpire(decoded.exp);
                setProfilePhoto(decoded.profilePhoto)
                
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        }
    )

    const getUsers = async() => {
        const res = await axiosJWT.get(`${baseUrl}/api/users`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log(res)
    }

    const register = async(data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/users/register`, data)
            successMessage(res.data)
        } catch (error) {
            console.log(error)
            setErrorRegister(error.response.data.message)
        }
    }


    const login = async(data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/users/login`, data)
            setUserId(res.data.userId)
            setProfilePhoto(res.data.profilePhoto)
        } catch (error) {
            console.log(error)
            setErrorLogin(error.response.data.message)
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                register, 
                errorRegister, 
                login, 
                errorLogin, 
                getUsers,
                userId,
                profilePhoto,
                axiosJWT,
                token
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}