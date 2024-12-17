import { useGetDogsProfiles } from "../../../queries/dogs";
import { PageWrapperStyle } from "../../plan/index.styles";
import { Petchoice } from "../../../assets/svg";
import { useNavigate } from "react-router-dom";
import { LoadingBar, MainPinkButton, Text } from "../../../components";
import { buttonStyle, dogImageStyle, footerStyle, headerWrapper, petRegisterButton, petSelectStyle, petWrapper, selectedDogStyle, titleWrapper, wrapper } from "./index.styles";
import colors from "../../../styles/colors";
import usePlanStore from "../../../stores/usePlanStore";
import { PET_SIZE } from "../../../interfaces";
import { useState } from "react";
import { notify } from "../../../utils/constants";
import usePageMeta from "../../../utils/usePageMeta";

export default function PetChoice() {
  usePageMeta("GATE | 일정생성-반려견 선택", 'GATE 일정생성'); //seo 검색 최적화
  const navigate = useNavigate();
  const { data: dogsProfiles, isLoading, isError } = useGetDogsProfiles();
  const { dogIds, setDogIds, setDogSize } = usePlanStore();
  const [selectedPets, setSelectedPets] = useState<{ id: number; size: PET_SIZE }[]>([]);

  if (isLoading) return  (<LoadingBar/>);
  if (isError) return <p>반려견 정보를 가져오는 데 실패했습니다.</p>;
  // console.log(dogsProfiles)
  const handleSelectPet = (id: number, size : PET_SIZE) => {
    setSelectedPets((prev) => {
      // 이미 선택된 반려견이면 제거
      const alreadySelected = prev.some((pet) => pet.id === id);
      if (alreadySelected) {
        return prev.filter((pet) => pet.id !== id); // 이미 선택된 반려견은 제거
      } else {
        return [...prev, { id, size }];
      }
    });

    setDogIds(id)
  };

  // 선택된 반려견들 중 가장 큰 사이즈를 추출
  const getMaxSize = (pets: { size: PET_SIZE }[]) => {
    const sizePriority = { SMALL: 1, MEDIUM: 2, LARGE: 3 }; // 사이즈 우선순위
    return pets.reduce((max, pet) => {
      return sizePriority[pet.size] > sizePriority[max.size] ? pet : max;
    }, { size: "SMALL" }); // 기본값은 소형(SMALL)
  };

  const handleRegisterPet = () => {
    navigate("/mypage/pet-register"); // Replace with the correct route for pet registration
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(dogIds.length === 0){
      e.preventDefault()
      notify({
        type: "warning",
        text: "반려견을 선택해주세요"
      })
      return;
    }
    const largestPet = getMaxSize(selectedPets);
    setDogSize(largestPet.size)
    
    navigate("/plan/create/place-choice");
  };

  return (
    <>
      {/* Page Wrapper */}
      <div css={PageWrapperStyle}>
        <div css={wrapper}>
          <div css={headerWrapper}>
            <Petchoice width={120} height={120} />
            <br />
            <div css={titleWrapper}>
              <Text type="Heading1">누구와 떠나나요?</Text>
              <Text type="Body1" color={colors.color.Gray0}>내 강아지와 함께 떠나요!</Text>
            </div>
          </div>

          {dogsProfiles && dogsProfiles?.length > 0 ? (
            <div css={petWrapper}>
              {dogsProfiles?.map(
                (dog: { id: number; name: string; imageUrl?: string; size?: PET_SIZE }) => (
                  <div
                    key={dog.id}
                    onClick={() => handleSelectPet(dog.id, dog.size)}
                    css={petSelectStyle}
                  >
                    <img
                      src={dog.imageUrl || '/images/default_profile.png'}
                      alt={dog.name}
                      css={dogImageStyle}
                    />
                    {/* Checkmark Overlay */}
                    {dogIds.includes(dog.id) && (
                      <div css={selectedDogStyle} >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#f1729b"
                          width="48px"
                          height="48px"
                        >
                          <path d="M9 16.2l-3.5-3.5L4.4 14.8 9 19.4 20.3 8l-1.3-1.4z" />
                        </svg>
                      </div>
                    )}
                    <Text 
                      type="Label1" 
                      color={dogIds.includes(dog.id)? colors.color.MainColor : colors.color.Black}
                    >
                        {dog.name}
                    </Text>
                  </div>
                )
              )}
            </div>
          ) : (
            <div css={petRegisterButton}>
              <Text type="Body2" color={colors.color.Gray0}>등록된 반려견이 없습니다.</Text>
              <MainPinkButton onClick={handleRegisterPet}>반려견 등록</MainPinkButton>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer css={footerStyle}>
        <MainPinkButton isDisabled={dogIds.length === 0} onClick={handleNextClick} css={buttonStyle}>다음</MainPinkButton>
      </footer>
    </>
  );
}
