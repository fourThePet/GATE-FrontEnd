import { useState } from "react";
import { DeleteIcon, WhiteCalender } from "../../../assets/svg";
import { Text } from "../../../components";
import colors from "../../../styles/colors";
import { actionWrapper, contentWrapper, dateWrapper, deleteIcon, info, listWrapper, mapWrapper, planWrapper, wrapper } from "./index.styles";
import PlanListCard from "../components/plan-list-card";

export default function PlanDetail(){
    const [ isEditMode, setIsEditMode ] = useState<boolean>(false);

    const handleEditButtonClick = () =>{
        setIsEditMode((prev)=> !prev)
    }
    const handleCompleteButtonClick = () =>{
        setIsEditMode((prev)=> !prev)
    }
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
                <div css={mapWrapper}>
                    지도
                </div>
                <div css={listWrapper}>
                    <div css={actionWrapper}>
                        {isEditMode ? (
                            <Text type="Body2" color={colors.color.MainColor} onClick={handleCompleteButtonClick}>완료</Text>

                        ) : (
                            <Text type="Body2" color={colors.color.Gray1} onClick={handleEditButtonClick}>편집</Text>

                        )}
                        </div>
                        <div css={planWrapper}>
                            <PlanListCard number={1}/>
                            <PlanListCard number={2}/>
                        </div>
                </div>
            </div>
        
        </div>
    )
}