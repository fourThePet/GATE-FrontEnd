import { toast } from "react-toastify";

interface Props {
    text : string;
    type: "default" | "success" | "warning" | "error";
    onClose?: () => void; 
}
export const notify = ({type, text, onClose} : Props)=>{
    const options = { onClose }; 
    switch(type){
        case "default":
            toast(text, options);
            break;
        case "success":
            toast.success(text, options);
            break;
        case "warning":
            toast.warning(text, options);
            break;
        case "error":
            toast.error(text, options);
            break;
        default : 
            toast(text,options)
    }
}