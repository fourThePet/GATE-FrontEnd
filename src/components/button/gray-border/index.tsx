import colors from "../../../styles/colors";
import Text from "../../text";
import { buttonStyles } from "./index.styles";

interface Props{
    onClick? : () => void,
    width? : string;
    height? : string;
    title : string;
}

export default function GrayBorderButton({onClick, width, height, title} : Props){
    return(
        <button onClick={onClick} css={buttonStyles({width, height})}>
            <Text type="Label2" color={colors.color.Gray2}>{title}</Text>
        </button>
    )
}