import { useEffect, useMemo, useState } from "react";
import { DeleteIcon, WhiteCalender } from "../../../assets/svg";
import { DeleteConfirmModal, LoadingBar, Text } from "../../../components";
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
import { useDeletePlansByPlanId, useGetPlansByPlanId, usePutPlansByPlanId } from "../../../queries/plans";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import LineMapComponent from "../components/maps/lineMap";
import { notify } from "../../../utils/constants";
import { isBefore, startOfDay } from "date-fns";

export default function PlanDetail() {
  const navigate = useNavigate();
  const { planId } = useParams(); // URL에서 planId를 가져옴
  const { data, isLoading} = useGetPlansByPlanId(Number(planId));
  const { mutate : modifyPlanList} = usePutPlansByPlanId(Number(planId))
  
  const [isEditMode, setIsEditMode] = useState<boolean>(false); //편집 모드
  const [plan, setPlan] = useState(null);
  const [isModalOpen , setIsModalOpen] = useState<boolean>(false); //삭제 모달 
  const [isConfirmModalOpen , setIsConfirmModalOpen] = useState<boolean>(false); //수정 확인 모달
  const [placeIds, setPlaceIds] = useState<number[]>([])

  const {mutate : deletePlanList} = useDeletePlansByPlanId()
  
  const planDate = startOfDay(new Date(plan?.date)); // plan.date의 시작 시각
  const today = startOfDay(new Date()); // 오늘 날짜의 시작 시각

  const isPastTravel = isBefore(planDate, today);
  useEffect(() => setPlan(data), [data]);

  const mapPlaces =
    plan?.planPlaces?.map((place) => ({
      name: place.place.name,
      latitude: place.place.latitude,
      longitude: place.place.longitude,
    })) || [];

  // useMemo를 사용하여 계산된 남은 일수를 저장
  const remainingDays = useMemo(() => {
    const today = new Date();
    const targetDate = new Date(plan?.date);

    // 밀리초 단위 차이 계산
    const diffTime = targetDate.getTime() - today.getTime();

    // 밀리초를 일수로 변환
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 부호 처리
    if (diffDays === 0) return "-Day";
    return diffDays < 0 ? `+${Math.abs(diffDays)}` : `-${Math.abs(diffDays)}`;
  }, [plan?.date]); // plan.date가 변경될 때만 계산

  const handleEditButtonClick = () => {
    //편집 버튼 눌렀을 때 이벤트
    setIsEditMode((prev) => !prev);
  };
  const handleCompleteButtonClick = () => { //삭제 완료 버튼 눌렀을 때!
    setIsConfirmModalOpen(true)
    
  };

  const handleModifyConfirmButtonClick = () =>{ //수정 완료 버튼
    modifyPlanList({placeIds}, {
      onSuccess : () =>{
        setIsConfirmModalOpen(false);
        notify({
          type : "success",
          text : "일정이 수정되었어요",
        })
        setIsEditMode((prev) => !prev);
      },
      onError : () => {
        notify({
          type : "error",
          text : "일정 수정 중 문제가 발생하였습니다. 다시 시도해 주세요",
        })
        setIsConfirmModalOpen(false);
      }
    })
  }

  const handleDeletePlace = (placeId: number) => { // 장소 삭제
    const updatedPlanPlaces = plan.planPlaces.filter((place) => place.place.id !== placeId);
    setPlan((prevPlan) => ({
      ...prevPlan,
      planPlaces: updatedPlanPlaces,
    }));
    setPlaceIds(updatedPlanPlaces.map((place) => place.place.id)); // 업데이트된 placeIds 상태
  };

  const handleOnDragEnd = (res) => { //드래그 했을 때 이벤트(수정)
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
    setPlaceIds(updatedPlaces.map((place) => place.place.id));
  };
  
  const handlePlanDeleteButtonClick = () =>{ //일정 삭제 아이콘
      setIsModalOpen(true);
  }

  const handleConfirmButtonClick = () =>{ // 모달창 확인 버튼
      if(planId){
        deletePlanList(Number(planId),{
          onSuccess : () => {
            setIsModalOpen(false);
            navigate('/plan',{ replace: true })
            notify({
              type : "success",
              text : "일정이 삭제되었어요"
            })
          },
          onError : () =>{
            notify({
              type : "error",
              text : "일정 삭제 중 문제가 발생하였어요. 다시 시도해 주세요"
            })
            setIsModalOpen(false);
          }
        });
      }
      
  }

  
  
  if(isLoading) return (<LoadingBar/>)
  return (
    <div css={contentWrapper}>
      <div css={wrapper}>
        <div css={info}>
          <div css={deleteIcon}>
            <DeleteIcon width={20} onClick={handlePlanDeleteButtonClick} />
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
        <div css={mapWrapper}>
          <LineMapComponent
            places={mapPlaces}
            centerLat={mapPlaces[0]?.latitude || 37.5665}
            centerLng={mapPlaces[0]?.longitude || 126.978}
          />
        </div>
        <div css={listWrapper}>
          <div css={actionWrapper}>
            { !isPastTravel && (
              isEditMode ? (
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
            ))}
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
                          onDelete={() => handleDeletePlace(place.place.id)}
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
      {isModalOpen && ( //삭제 확인 모달
        <DeleteConfirmModal 
        isModalOpen={isModalOpen} 
        title="일정삭제" 
        subTitle="일정을 삭제하시겠어요?" 
        closeModal={()=>setIsModalOpen(false)}
        handleConfirmButtonClick={handleConfirmButtonClick}
        />)}
      {isConfirmModalOpen && (
        <DeleteConfirmModal 
        isModalOpen={isConfirmModalOpen} 
        title="편집 완료" 
        subTitle="일정 편집을 완료하시겠어요?" 
        closeModal={()=>setIsConfirmModalOpen(false)}
        handleConfirmButtonClick={handleModifyConfirmButtonClick}
        />
      )}
    </div>
  );
}
