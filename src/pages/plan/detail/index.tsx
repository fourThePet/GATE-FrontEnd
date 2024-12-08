import { useState } from "react";
import { DeleteIcon, WhiteCalender } from "../../../assets/svg";
import { Text } from "../../../components";
import colors from "../../../styles/colors";
import { actionWrapper, contentWrapper, dateWrapper, deleteIcon, info, listWrapper, mapWrapper, planWrapper, wrapper } from "./index.styles";

import { DragDropContext } from "react-beautiful-dnd";
import { PlanEditCard, PlanListCard, StrictModeDroppable } from "../components";
// 예시 데이터
const initialPlan = {
    id: 1,
    date: "2024-11-28",
    city: {
      id: 1,
      cityName: "서울"
    },
    planPlaces: [
      {
        id: 1,
        sequence: 1,
        place: {
          id: 1,
          name: "멍멍이카페",
          category: "카페",
          latitude: 37.7519573928855,
          longitude: 127.049286104824
        }
      },
      {
        id: 2,
        sequence: 2,
        place: {
          id: 2,
          name: "반려동물공원",
          category: "공원",
          latitude: 37.7749295,
          longitude: 127.0627361
        },
      },
      {
        id: 3,
        sequence: 3,
        place: {
          id: 3,
          name: "희망공원",
          category: "공원",
          latitude: 37.7749295,
          longitude: 127.0627361
        },
      },
      {
        id: 4,
        sequence: 4,
        place: {
          id: 4,
          name: "평화공원",
          category: "공원",
          latitude: 37.7749295,
          longitude: 127.0627361
        },
      }
    ]
};
export default function PlanDetail(){
    const [ isEditMode, setIsEditMode ] = useState<boolean>(false); //편집 모드
    const [plan, setPlan] = useState(initialPlan);

    const handleEditButtonClick = () =>{ //편집 버튼 눌렀을 때 이벤트
        setIsEditMode((prev)=> !prev)
    }
    const handleCompleteButtonClick = () =>{ // 완료 버튼 눌렀을 때
        /** To do : 변경사항 저장 로직 */

        setIsEditMode((prev)=> !prev)
    }

    const handleOnDragEnd = (result) => {
        const { destination, source } = result;

        // 목적지가 없으면 아무 작업도 하지 않음
        if (!destination) return;

        // 순서 변경 로직
        const reorderedPlaces = Array.from(plan.planPlaces);
        const [removed] = reorderedPlaces.splice(source.index, 1);
        reorderedPlaces.splice(destination.index, 0, removed);

        // sequence 업데이트
        const updatedPlaces = reorderedPlaces.map((place, index) => ({
        ...place,
        sequence: index + 1, // 새로운 sequence 값 설정
        }));

        // 업데이트된 데이터 상태로 설정
        setPlan((prevPlan) => ({
        ...prevPlan,
        planPlaces: updatedPlaces,
        }));

    }
    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={info}>
                    <div css={deleteIcon}>
                        <DeleteIcon width={24}/>
                        {/* <Text type="Label4" color={colors.color.White2}>삭제</Text> //아이콘이 아래와 겹쳐서 고민 */}
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
                            <Text type="Label1" color={colors.color.MainColor} onClick={handleCompleteButtonClick}>완료</Text>

                        ) : (
                            <Text type="Label1" color={colors.color.Gray1} onClick={handleEditButtonClick}>편집</Text>

                        )}
                        </div>
                        <div css={planWrapper}>
                            {isEditMode ? (
                                <DragDropContext onDragEnd={handleOnDragEnd}>  
                                    <StrictModeDroppable droppableId="droppable-1">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{ listStyleType: 'none' }}
                                            >
                                                {plan.planPlaces.map((place, index)=>(
                                                    <PlanEditCard sequence={place.sequence} place={place.place} index={index}/>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )

                                        }
                                        {/* <>
                                        <PlanEditCard sequence={1}/>
                                        <PlanEditCard sequence={2}/>
                                        <PlanEditCard sequence={3}/>
                                        </> */}
                                    </StrictModeDroppable>

                                </DragDropContext>
                                
                            ) : (
                                <>
                                {plan.planPlaces.map((place)=>(
                                    <PlanListCard sequence={place.sequence} place={place.place}/>
                                ))}
                                </>

                            )}
                            
                        </div>
                </div>
            </div>
        
        </div>
    )
}