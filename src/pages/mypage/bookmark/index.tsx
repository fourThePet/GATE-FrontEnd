import { MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { BookMarkList } from "../components";
import { allListWrapper, bottomButtonStyle, contentWrapper, countWrapper, wrapper } from "./index.styles";

export default function MyBookMark(){
    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={countWrapper}>
                    <Text type="Label21" color={colors.color.Gray1}>전체 
                        <Text type="Label21" color={colors.color.MainColor}> {'count'}</Text>개
                    </Text>
                </div>
                <div css={allListWrapper}>
                    <BookMarkList/>
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton width="100%" title="즐겨찾기 추가"/>
                </div>
            </div>
        </div>
    )
}