import { DeleteIcon, WhiteCalender } from "../../../assets/svg";
import { Text } from "../../../components";
import colors from "../../../styles/colors";
import { contentWrapper, dateWrapper, deleteIcon, info, wrapper } from "./index.styles";

export default function PlanDetail(){
    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={info}>
                    <div css={deleteIcon}>
                        <DeleteIcon width={24}/>
                    </div>
                    <Text type="Heading3" color={colors.color.White1}>가평 여행</Text>
                    <Text type="Heading2" color={colors.color.White1}>두근두근, 데이트 D-4</Text>
                    <div css={dateWrapper}>
                        <Text type="Body2" color={colors.color.White1}>2024.11.19</Text>
                        <WhiteCalender width={16}/>
                    </div>
                </div>
            </div>
        
        </div>
    )
}