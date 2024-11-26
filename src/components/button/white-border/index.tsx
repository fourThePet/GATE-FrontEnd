import Text from "../../text";
import { buttonStyles } from "./index.styles";

interface Props{
    onClick? : () => void,
    width? : string;
    height? : string;
    title : string;
}

export default function WhiteBorderButton({onClick, width, height, title} : Props){
    return(
        <button onClick={onClick} css={buttonStyles({width, height})}>
            <Text type="Label3">{title}</Text>
        </button>
    )
}