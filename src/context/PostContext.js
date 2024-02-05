import { createContext, useContext, useState} from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/baseUrl";
import { successMessage } from "../utils/message";
import { useNavigate } from 'react-router-dom';


export const PostContext = createContext();

export const PostContextProvider = ({children}) => {

    const {userId, axiosJWT, token, Profile, profileUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])
    const [singlePost, setSinglePost] = useState("")
    const [popularPosts, setPopularPosts] = useState([])
    const [errorPost, setErrorPost] = useState("")

    const addPost = async(data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('image', data.image);
            formData.append('user', userId);

            const res = await axiosJWT.post(`${baseUrl}/api/post`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            navigate('/')

        } catch (error) {
            console.log(error)
            setErrorPost(error.response.data.message)
        }
    }


    const getPosts = async() => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/post`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const detailPost = async(postId) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/post/${postId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setSinglePost(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const editPost = async(data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/post/${data.id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            navigate(`/detail-post/${data.id}`)
        } catch (error) {
            console.log(error)
        }
    }


    const deletePost = async(id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/post/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }



    const likePost = async(postId) => {
        
        const data = {
            postId: postId
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/post/likes`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getPosts()
            Profile()
        } catch (error) {
            console.log(error)
        }
    }


    const disLikePost = async(postId) => {
        
        const data = {
            postId: postId
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/post/dislikes`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getPosts()
            Profile()
        } catch (error) {
            console.log(error)
        }
    }



    const likePostProfile = async(postId, user) => {
        const data = {
            postId: postId
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/post/likes`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getPosts()
            profileUser(user)
        } catch (error) {
            console.log(error)
        }
    }


    const disLikePostProfile = async(postId, user) => {
        const data = {
            postId: postId
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/post/dislikes`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getPosts()
            profileUser(user)
        } catch (error) {
            console.log(error)
        }
    }



    const popularPost = async() => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/post/popular`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setPopularPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <PostContext.Provider 
            value={{
                addPost, 
                getPosts, 
                posts, 
                detailPost, 
                singlePost, 
                editPost, 
                deletePost, 
                likePost, 
                disLikePost,
                popularPost,
                popularPosts,
                errorPost,
                likePostProfile,
                disLikePostProfile
            }}
        >
            {children}
        </PostContext.Provider>
    )
}