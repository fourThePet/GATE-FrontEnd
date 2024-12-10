import { useState, useCallback, useRef } from "react";
import { Schedulemain } from "../../assets/svg";
import { PageWrapper } from "../../styles/ui";
import { Imgblock } from "./index.styles";
import { css } from "@emotion/react";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import { TravelForm } from "./components/travel-form";
import { useGetPlacesCities } from "../../queries";
import { useNavigate } from "react-router-dom";
import { useGetPlans } from "../../queries/plans";
const defaultImageUrl = "/path/to/default-image.jpg"; // 기본 이미지 경로
import { useGetMembersInfo } from "../../queries";

export default function Plan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"coming" | "past">("coming");
  const { data: memberInfo } = useGetMembersInfo();

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

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>지역 정보를 가져오는 데 실패했습니다.</p>;

  const handleCreateButtonClick = () => {
    navigate(`/plan/create`);
  };

  return (
    <>
      <div
        css={css`
          ${PageWrapper};
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
        `}
      >
        <style>
          {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
        <div
          css={css`
            ${Imgblock};
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
          `}
        >
          <div
            css={css`
              width: 100%;
              height: auto;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            `}
          >
            <Schedulemain
              css={css`
                width: 100%;
                max-width: 100%;
                height: auto;
                object-fit: cover;
              `}
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              left: 35%;
              transform: translateX(-50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 250px;
            `}
          >
            <div>
              <span css={typo.Heading3}>
                {memberInfo?.nickname || "게스트"}님, 반갑습니다 <br /> GATE와
                함께하는 일정을 세워볼까요? 🐾
              </span>
            </div>
            <button
              css={Button.mainPinkButton({
                isDisabled: false,
                width: "100%",
                height: "50px",
              })}
              style={{ marginLeft: "50%" }}
              onClick={handleCreateButtonClick}
            >
              📅 일정 생성하기
            </button>
          </div>
        </div>

        {/* 여행지 추천 */}
        <div
          css={css`
            padding: 20px;
          `}
        >
          <h3 css={typo.Heading3}>🐶 여행지 추천</h3>
          <div
            css={css`
              display: flex;
              gap: 10px;
              margin-top: 10px;
              overflow-x: auto;
              white-space: nowrap;
              padding-bottom: 10px;
              &::-webkit-scrollbar {
                height: 6px;
              }
              &::-webkit-scrollbar-thumb {
                background-color: #ccc;
                border-radius: 3px;
              }
              &::-webkit-scrollbar-track {
                background-color: #f1f1f1;
              }
            `}
          >
            {cities?.map((city: { id: number; cityName: string }) => (
              <button
                key={city.id}
                css={Button.grayBorderButton({
                  width: "100px",
                  height: "50px",
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
          css={css`
            padding: 20px;
            margin-bottom: 100px;
            margin-top: -20px;
          `}
        >
          {/* 탭 */}
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              align-items: center;
              margin: 20px 0;
              padding: 10px;
              width: 100%;
            `}
          >
            <div
              onClick={() => handleTabClick("coming")}
              css={css`
                cursor: pointer;
                font-weight: ${activeTab === "coming" ? "bold" : "normal"};
                color: ${activeTab === "coming" ? "#F1729B" : "#A4A4A4"};
                border-bottom: ${activeTab === "coming"
                  ? "5px solid #F1729B"
                  : "none"};
                padding-bottom: 10px;
                width: 160px;
                text-align: center;
              `}
            >
              ✈️ 다가오는 여행
            </div>
            <div
              onClick={() => handleTabClick("past")}
              css={css`
                cursor: pointer;
                font-weight: ${activeTab === "past" ? "bold" : "normal"};
                color: ${activeTab === "past" ? "#F1729B" : "#A4A4A4"};
                border-bottom: ${activeTab === "past"
                  ? "5px solid #F1729B"
                  : "none"};
                padding-bottom: 10px;
                width: 160px;
                text-align: center;
              `}
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
                    imageUrl={defaultImageUrl} // 기본 이미지 URL 추가
                    travelName={travel.cityName}
                    date={travel.date}
                    dogCount={travel.dogSize}
                  />
                ))
              ) : (
                <div
                  css={css`
                    text-align: center;
                    color: #9a9ea6;
                    font-size: 16px;
                    margin-top: 20px;
                  `}
                >
                  다가오는 여행 일정이 없습니다.
                </div>
              ))}
            {activeTab === "past" &&
              (pastTravels.length > 0 ? (
                pastTravels.map((travel) => (
                  <TravelForm
                    key={travel.id}
                    imageUrl={defaultImageUrl} // 기본 이미지 URL 추가
                    travelName={travel.cityName}
                    date={travel.date}
                    dogCount={travel.dogSize}
                  />
                ))
              ) : (
                <div
                  css={css`
                    text-align: center;
                    color: #9a9ea6;
                    font-size: 16px;
                    margin-top: 20px;
                  `}
                >
                  지난 여행 일정이 없습니다.
                </div>
              ))}
          </div>
          {activeTab === "coming" && hasComingNextPage && (
            <div ref={handleComingObserver}>Loading more...</div>
          )}
          {activeTab === "past" && hasPastNextPage && (
            <div ref={handlePastObserver}>Loading more...</div>
          )}
        </div>
      </div>
    </>
  );
}
