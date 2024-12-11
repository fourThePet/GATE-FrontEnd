import { ClipLoader } from "react-spinners";
export default function LoadingBar(){
    return(
        (<ClipLoader
            color="#F1729B"
            cssOverride={{
              margin: 'auto',
              borderWidth: '5px',
            }}
            size={60}
          />)
    )
}