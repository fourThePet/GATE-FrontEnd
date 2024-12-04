import { MenuIcon, MyBookmark } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { listWrapper, wrapper } from "./index.styles";

export default function BookMarkList(){
    return ( 
        <div css={wrapper}>
            <MyBookmark width={24}/>
            <div css={listWrapper}>
                <Text type="Body2">{'더왈츠 애견카페'}</Text>
                <Text type="Label3" color={colors.color.Gray1}>{'서울특별시 강남구 역삼로 134'}</Text>
            </div>
            <div>
                <MenuIcon width={16} />
            </div>
        </div>
    )
}