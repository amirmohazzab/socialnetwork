import { createContext, useContext, useEffect, useState} from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/baseUrl";
import { successMessage } from "../utils/message";
import { useNavigate } from "react-router-dom";


export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {

    const [category, setCategory] = useState([])
    const {axiosJWT, token} = useContext(AuthContext)

    const navigate = useNavigate()

    const createCategory = async(data) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/category`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            getCategory()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getCategory()
    }, [])
    
    const getCategory = async(data) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/category`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setCategory(res.data)
        } catch (error) {
            console.log(error)
        }
    }



    const updateCategory = async(data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/category/${data.id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            //getCategory()
            navigate('/add-category')
        } catch (error) {
            console.log(error)
        }
    }


    const deleteCategory = async(id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/category/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data)
            getCategory()
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <CategoryContext.Provider 
            value={{
                createCategory,
                getCategory,
                category,
                updateCategory,
                deleteCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}