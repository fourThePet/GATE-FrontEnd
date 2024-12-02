import { GrayPlusIcon } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { wrapper } from "./index.styles";

interface Props {
    onClick? : () => void
}

export default function EmptyPetCard({onClick} : Props){
    return (
        <div css={wrapper}>
            <GrayPlusIcon width={40} onClick={onClick}/>
            <Text type="Label2" color={colors.color.Gray2}>반려견을 등록해주세요!</Text>
        </div>
    )
}