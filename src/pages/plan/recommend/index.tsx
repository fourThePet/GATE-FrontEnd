import { Text } from "../../../components";
import colors from "../../../styles/colors";
import { contentWrapper, infoWrapper, listWrapper, mapWrapper, wrapper } from "./index.styles";

export default function PlanRecommend(){
    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={infoWrapper}>
                    <Text type="Heading2">가평</Text>
                    <Text type="Heading2">
                        <Text type="Heading2" color={colors.color.MainColor}>추천일정</Text>입니다.
                    </Text>
                    <Text type="Label21" color={colors.color.Gray1}>
                        GATE가 알려준 맞춤일정으로 데이트를 즐겨보세요
                    </Text>
                </div>
                <div css={mapWrapper}>
                    지도
                </div>
                <div css={listWrapper}>
                    
                </div>
            </div>
        </div>
    )
}