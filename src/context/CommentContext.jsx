import { createContext, useContext} from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/baseUrl";
import { successMessage } from "../utils/message";
import { PostContext } from "./PostContext";

export const CommentContext = createContext();

export const CommentContextProvider = ({children}) => {

    const {axiosJWT, token} = useContext(AuthContext)
    const {detailPost} = useContext(PostContext)

    const createComment = async(data) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/comment`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            detailPost(data.postId)
        } catch (error) {
            console.log(error)
        }
    }


    const updateComment = async(data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/comment/${data.commentId}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            detailPost(data.postId)
        } catch (error) {
            console.log(error)
        }
    }


    const deleteComment = async(data) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/comment/${data.commentId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            detailPost(data.postId)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <CommentContext.Provider 
            value={{createComment, updateComment, deleteComment}}
        >
            {children}
        </CommentContext.Provider>
    )

}