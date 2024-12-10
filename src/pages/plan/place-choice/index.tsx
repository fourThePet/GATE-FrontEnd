import { useLocation, useNavigate } from "react-router-dom";
import { GrayCalender } from "../../../assets/svg";
import {  MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { PlaceAddButton, SelectionPlaceList } from "../components";
import { actionWrapper, bottomButtonStyle, contentWrapper, dateWrapper, listWrapper, mapWrapper, placeWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";


export default function PlaceChoice(){
    const navigate = useNavigate();
    const { state } = useLocation(); // PlaceAdd에서 전달한 state를 받기
    const selectItems = state?.selectItems || []; // selectItems를 받아옵니다.
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
                            <PlaceAddButton onClick={()=>navigate('/plan/create/place-add',{state : {selectItems}})}/>
                    </div>
                    <div css={listWrapper(selectItems?.length > 0)}>
                        {selectItems?.length > 0 ? (
                            selectItems?.map((item, index)=>(
                                <SelectionPlaceList key={index} placeName={item.placeName} roadAddress={item.roadAddress}/>
                            ))
                        ) : (
                            <Text type="Body2" color={colors.color.Gray1}>선택된 장소가 없어요</Text>
                        )}
                    </div>
                    
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton title="다음" />
                </div>
            </div>
        </div>
    )

}