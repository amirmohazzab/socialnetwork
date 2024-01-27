import { createContext} from "react";


export const PostContext = createContext();

export const PostContextProvider = ({children}) => {

    
    return (
        <PostContext.Provider 
            value={{}}
        >
            {children}
        </PostContext.Provider>
    )
}