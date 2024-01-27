import { toast } from "react-toastify";

export const successMessage = (message)=> {
    toast.success(message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light'
    });
};

export const errorMessage = (message) => {
    toast.error(message, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true
    });
};