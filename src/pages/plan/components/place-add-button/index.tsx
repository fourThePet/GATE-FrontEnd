import { WhitePlus } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { buttonStyles } from "./index.styles";

interface Props{
    onClick? : () => void,
    width? : string;
    height? : string;
}

export default function PlaceAddButton({onClick, width, height} : Props){
    return(
        <button onClick={onClick} css={buttonStyles({width, height})}>
            <WhitePlus width={12}/>
            <Text type="Label21">장소추가</Text>
        </button>
    )
}