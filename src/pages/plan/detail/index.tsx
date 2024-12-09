import { useEffect, useMemo, useState } from "react";
import { DeleteIcon, WhiteCalender } from "../../../assets/svg";
import { Text } from "../../../components";
import colors from "../../../styles/colors";
import {
  actionWrapper,
  contentWrapper,
  dateWrapper,
  deleteIcon,
  info,
  listWrapper,
  mapWrapper,
  planWrapper,
  wrapper,
} from "./index.styles";

import { PlanEditCard, PlanListCard, StrictModeDroppable } from "../components";
import { useGetPlanByPlanId } from "../../../queries/plans";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

export default function PlanDetail() {
  const { planId } = useParams(); // URL에서 planId를 가져옴
  const { data } = useGetPlanByPlanId(Number(planId));
  // console.log(data);
  const [isEditMode, setIsEditMode] = useState<boolean>(false); //편집 모드
  const [plan, setPlan] = useState(null);
  // const [plan, setPlan] = useState(result);

  useEffect(() => setPlan(data), [data]);

  // useMemo를 사용하여 계산된 남은 일수를 저장
  const remainingDays = useMemo(() => {
    const today = new Date();
    const targetDate = new Date(plan?.date);

    // 밀리초 단위 차이 계산
    const diffTime = targetDate.getTime() - today.getTime();

    // 밀리초를 일수로 변환
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 부호 처리
    return diffDays < 0 ? `+${Math.abs(diffDays)}` : `-${Math.abs(diffDays)}`;
  }, [plan?.date]); // plan.date가 변경될 때만 계산

  const handleEditButtonClick = () => {
    //편집 버튼 눌렀을 때 이벤트
    setIsEditMode((prev) => !prev);
  };
  const handleCompleteButtonClick = () => {
    // 완료 버튼 눌렀을 때
    /** To do : 변경사항 저장 로직 */

    setIsEditMode((prev) => !prev);
  };

  const handleOnDragEnd = (res) => {
    const { destination, source } = res;

    // 목적지가 없으면 아무 작업도 하지 않음
    if (!destination) return;

    // 순서 변경 로직
    const reorderedPlaces = [...plan.planPlaces];
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
  };

  // console.log(plan.planPlaces)
  return (
    <div css={contentWrapper}>
      <div css={wrapper}>
        <div css={info}>
          <div css={deleteIcon}>
            <DeleteIcon width={20} />
            {/* <Text type="Label4" color={colors.color.White2}>삭제</Text> 아이콘이 아래와 겹쳐서 고민 */}
          </div>
          <Text type="Heading3" color={colors.color.White1}>
            {plan?.city.cityName} 여행
          </Text>
          <Text type="Heading2" color={colors.color.White1}>
            두근두근, 데이트 D{remainingDays}
          </Text>
          <div css={dateWrapper}>
            <Text type="Body2" color={colors.color.White1}>
              {plan?.date}
            </Text>
            <WhiteCalender width={16} />
          </div>
        </div>
        <div css={mapWrapper}>지도</div>
        <div css={listWrapper}>
          <div css={actionWrapper}>
            {isEditMode ? (
              <Text
                type="Label1"
                color={colors.color.MainColor}
                onClick={handleCompleteButtonClick}
              >
                완료
              </Text>
            ) : (
              <Text
                type="Label1"
                color={colors.color.Gray1}
                onClick={handleEditButtonClick}
              >
                편집
              </Text>
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
                      style={{ listStyleType: "none" }}
                    >
                      {plan?.planPlaces.map((place, index) => (
                        <PlanEditCard
                          sequence={place.sequence}
                          place={place.place}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </DragDropContext>
            ) : (
              <>
                {plan?.planPlaces.map((place) => (
                  <PlanListCard sequence={place.sequence} place={place.place} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
