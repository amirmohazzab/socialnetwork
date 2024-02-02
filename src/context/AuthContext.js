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
    const [userData, setUserData] = useState([])
    const [findFollow, setFindFollow] = useState(null)

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
            navigate('/')
        } catch (error) {
            console.log(error)
            setErrorLogin(error.response.data.message)
        }
    }


    const Profile = async() => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${userId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const profilePhotoUpload = async(data) => {
        try {
            const formData = new FormData();
            formData.append("image", data)
            const res = await axiosJWT.put(`${baseUrl}/api/users/profilephoto-upload`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            Profile()
            successMessage(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const profileUpdate = async(data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/${userId}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }


    const profileUser = async(id) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const follow = async(followId) => {
        const data = {
            followId: followId
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/follow`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            profileUser(followId)
        } catch (error) {
            console.log(error)
        }
    }


    const unFollow = async(unfollowId) => {
        const data = {
            unfollowId: unfollowId
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/unfollow`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            profileUser(unfollowId)
        } catch (error) {
            console.log(error)
        }
    }


    
    const findFollower = async(followId) => {
        const data = {
            userId: userId,
            followId: followId
        }
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/users/findFollower`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setFindFollow(res.data)
        } catch (error) {
            console.log(error)
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
                token,
                Profile,
                userData,
                profilePhotoUpload,
                profileUpdate,
                profileUser,
                follow,
                unFollow,
                findFollower,
                findFollow
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}