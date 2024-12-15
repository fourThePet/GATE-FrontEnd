import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ToastMessage(){
    return (
        <ToastContainer
            position="bottom-center"
            limit={1}
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
        />
    )
}