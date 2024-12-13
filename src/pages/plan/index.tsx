import { useState, useCallback, useRef } from "react";
import { Schedulemain } from "../../assets/svg";
import { buttonWrapper, imageBlock, imageWrapper, loadingWrapper, mainImage, mainTitle, mainWrapper, noDataText, planListWrapper, planWrapper, recommendCity, recommendLabel, tabStyle, wrapper } from "./index.styles";
import { Button } from "../../components/button/button";
import { TravelForm } from "./components/travel-form";
import { useGetPlacesCities } from "../../queries";
import { useNavigate } from "react-router-dom";
import { useGetPlans } from "../../queries/plans";
import { useGetMembersInfo } from "../../queries";
import { LoadingBar, MainPinkButton, Text } from "../../components";
import { useAuthStore } from "../../stores/useAuthStore";
import colors from "../../styles/colors";

export default function Plan() {
  const defaultImageUrl = '/images/default_city.png'
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"coming" | "past">("coming");
  const { data: memberInfo } = useGetMembersInfo();
  const {isLoggedIn} = useAuthStore()
  // 다가오는 여행 데이터
  const {
    data: comingTravelsData,
    fetchNextPage: fetchNextComingPage,
    hasNextPage: hasComingNextPage,
    isFetchingNextPage: isFetchingComingNextPage,
  } = useGetPlans("AFTER", "ASC");

  // 지난 여행 데이터
  const {
    data: pastTravelsData,
    fetchNextPage: fetchNextPastPage,
    hasNextPage: hasPastNextPage,
    isFetchingNextPage: isFetchingPastNextPage,
  } = useGetPlans("BEFORE", "DESC");

  // IntersectionObserver를 위한 Ref
  const comingObserver = useRef<IntersectionObserver | null>(null);
  const pastObserver = useRef<IntersectionObserver | null>(null);

  // 다가오는 여행 무한 스크롤 핸들러
  const handleComingObserver = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingComingNextPage) return;
      if (comingObserver.current) comingObserver.current.disconnect();
      comingObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasComingNextPage) {
          fetchNextComingPage();
        }
      });
      if (node) comingObserver.current.observe(node);
    },
    [isFetchingComingNextPage, hasComingNextPage, fetchNextComingPage]
  );

  // 지난 여행 무한 스크롤 핸들러
  const handlePastObserver = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingPastNextPage) return;
      if (pastObserver.current) pastObserver.current.disconnect();
      pastObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasPastNextPage) {
          fetchNextPastPage();
        }
      });
      if (node) pastObserver.current.observe(node);
    },
    [isFetchingPastNextPage, hasPastNextPage, fetchNextPastPage]
  );

  const handleTabClick = (tab: "coming" | "past") => {
    setActiveTab(tab);
  };

  // 데이터 매핑
  const comingTravels =
    comingTravelsData?.pages.flatMap((page) => page.content) || [];
  const pastTravels =
    pastTravelsData?.pages.flatMap((page) => page.content) || [];

  const { data: cities, isLoading, isError } = useGetPlacesCities();

  if (isLoading) return  (<LoadingBar/>);
  if (isError) return <p>지역 정보를 가져오는 데 실패했습니다.</p>;
  
  const handleCreateButtonClick = () => {
    if(isLoggedIn){
      navigate(`/plan/create`);
    }else{
      alert('로그인이 필요해요.')
      navigate('/login')
    }
  };

  const handleTravelClick = (planId: number) => {
    navigate(`/plan/detail/${planId}`);
  };

  return (
    <>
      <div css={wrapper}>
        <style>
          {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
        <div css={imageBlock}>
          <div css={imageWrapper}>
            <Schedulemain css={mainImage} />
          </div>
          <div css={mainWrapper}>
            <div css={mainTitle}>
                <Text type="Heading3">{memberInfo?.nickname || "게스트"}님, 반갑습니다 <br /> GATE와
                함께하는 일정을 세워볼까요? 🐾</Text>
            </div>
            <div css={buttonWrapper}>
              <MainPinkButton onClick={handleCreateButtonClick} width="40%">📅 일정 생성하기</MainPinkButton>
            </div>
          </div>
        </div>

        {/* 여행지 추천 */}
        <div css={recommendCity}>
          <div>
            <Text type="Heading3">🐶 여행지 추천</Text>
          </div>
          <div css={recommendLabel}>
            {cities?.map((city: { id: number; cityName: string }) => (
              <button
                key={city.id}
                css={Button.grayBorderButton({
                  width: "100px",
                  height: "40px",
                })}
                style={{ padding: "8px 40px" }}
              >
                {city.cityName}
              </button>
              
            ))}
          </div>
        </div>

        {/* 다가오는 여행 */}
        <div
          css={planWrapper}
        >
          {/* 탭 */}
          <div css={planListWrapper}>
            <div
              onClick={() => handleTabClick("coming")}
              css={tabStyle("coming", activeTab)}
            >
              ✈️ 다가오는 여행
            </div>
            <div
              onClick={() => handleTabClick("past")}
              css={tabStyle("past", activeTab)}
            >
              🏝️ 지난 여행
            </div>
          </div>

          {/* 탭 내용 */}
          <div>
            {activeTab === "coming" &&
              (comingTravels.length > 0 ? (
                comingTravels.map((travel) => (
                  <TravelForm
                    key={travel.id}
                    imageUrl={travel.cityPhotoUrl || defaultImageUrl}
                    travelName={travel.cityName}
                    date={travel.date}
                    dogCount={travel.dogSize}
                    onClick={() => handleTravelClick(travel.id)}
                  />
                ))
              ) : (
                <div css={noDataText}>
                  <Text type="Body2" color={colors.color.Gray1}>
                    다가오는 여행 일정이 없습니다.
                  </Text>
                </div>
                
              ))}
            {activeTab === "past" &&
              (pastTravels.length > 0 ? (
                pastTravels.map((travel) => (
                  <TravelForm
                    key={travel.id}
                    imageUrl={travel.cityPhotoUrl ||defaultImageUrl} // 기본 이미지 URL 추가
                    travelName={travel.cityName}
                    date={travel.date}
                    dogCount={travel.dogSize}
                    onClick={() => handleTravelClick(travel.id)}
                  />
                ))
              ) : (
                <div css={noDataText}>
                  <Text type="Body2" color={colors.color.Gray1}>
                  지난 여행 일정이 없습니다.
                  </Text>
              </div>
              ))}
          </div>
          {activeTab === "coming" && hasComingNextPage && (
            
            <div ref={handleComingObserver} css={loadingWrapper}><LoadingBar/></div>
          )}
          {activeTab === "past" && hasPastNextPage && (
            <div ref={handlePastObserver} css={loadingWrapper}><LoadingBar/></div>
          )}
        </div>
      </div>
    </>
  );
}
