import { inputStyle } from "./index.styles";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    width : string
    placeholder : string
    
}
export default function Input({width, placeholder, ...props} : Props){
    return(
        <input css={inputStyle({width})} placeholder={placeholder} {...props}></input>
    )
}