import { GrayPlusIcon } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { wrapper } from "./index.styles";

export default function EmptyPetCard(){
    return (
        <div css={wrapper}>
            <GrayPlusIcon width={40}/>
            <Text type="Label2" color={colors.color.Gray2}>반려견을 등록해주세요!</Text>
        </div>
    )
}