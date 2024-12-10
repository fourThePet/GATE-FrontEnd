import { useNavigate } from "react-router-dom";
import { GrayCalender } from "../../../assets/svg";
import {  MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { PlaceAddButton } from "../components";
import { actionWrapper, bottomButtonStyle, contentWrapper, dateWrapper, mapWrapper, noData, placeWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";

export default function PlaceChoice(){
    const navigate = useNavigate()
    return (
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={titleWrapper}>
                    <Text type="Heading3">가평</Text>
                    <div css={dateWrapper}>
                        <Text type="Body2" color={colors.color.Gray1}>2024-11-29</Text>
                        <GrayCalender width={16}/>
                    </div>
                </div>
                <div css={mapWrapper}>
                    지도
                </div>
                <div css={placeWrapper}>
                    <div css={actionWrapper}>
                        <div css={textWrapper}>
                            <Text type="Heading3">장소</Text>
                            <Text type="Label21" color={colors.color.Gray1}>초기화</Text>
                        </div>
                            <PlaceAddButton onClick={()=>navigate('/plan/create/place-add')}/>
                    </div>
                    <div css={noData}>
                        <Text type="Label21" color={colors.color.Gray1}>선택된 장소가 없어요</Text>
                    </div>
                    
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton title="다음" />
                </div>
            </div>
        </div>
    )

}