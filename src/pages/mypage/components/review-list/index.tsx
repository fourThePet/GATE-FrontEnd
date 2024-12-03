import { MenuIcon } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { cardWrapper, line, titleWrapper, wrapper } from "./index.styles";

export default function ReviewList(){
    return(
        <div css={wrapper}>
            <div>
                <Text type="Body2" color={colors.color.Gray1}>2024-11-11</Text>
            </div>
            <div css={cardWrapper}>
                <div css={titleWrapper}>
                    <Text type="Body2">{'더왈츠 애견카페'}</Text>
                    <Text type="Label3" color={colors.color.Gray1}>{'서울특별시 강남구 역삼로 134'}</Text>
                    <MenuIcon width={16}/>
                </div>
                <hr css={line} color={colors.color.Gray3}/>
            </div>
        </div>
    )
}