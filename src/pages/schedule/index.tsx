import { useState } from "react";
import { Schedulemain } from "../../assets/svg";
import { PageWrapper } from "../../styles/ui";
import { Imgblock } from "./index.styles";

import { css } from "@emotion/react";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import { Block } from "../../components/block/block";
import { TravelForm } from "./components/travel-form";

export default function Schedule() {
  const [showComingTravel, setShowComingTravel] = useState(true); // 디폴트 상태를 true로 설정
  const [showPastTravel, setShowPastTravel] = useState(true); // 디폴트 상태를 true로 설정

  const toggleComingTravel = () => setShowComingTravel((prev) => !prev);
  const togglePastTravel = () => setShowPastTravel((prev) => !prev);

  return (
    <>
      <div
        css={css`
          ${PageWrapper};
          height: 100%; /* 부모 요소 높이를 100vh로 고정 */
          overflow-y: scroll; /* 스크롤 활성화 */
          overflow-x: hidden; /* 가로 스크롤 제거 */
          scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
          -ms-overflow-style: none; /* IE/Edge에서 스크롤바 숨김 */
          position: relative; /* 상대 위치 지정 */
        `}
      >
        <style>
          {`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
          }
        `}
        </style>
        <div
          css={css`
            ${Imgblock};
          `}
        >
          <Schedulemain />
          <div
            css={css`
              position: absolute;
              top: 40%;
              left: 40%;
              transform: translate(-60%, -60%);
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
            className="text-overlay"
          >
            <div
              css={Block.flexBlock({
                position: "absolute",
                direction: "column",
              })}
              style={{ marginTop: "100%" }}
            >
              <span css={typo.Heading3}>
                OO 님, 반갑습니다 <br /> 뭉치와 함께하는 일정을 세워볼까요? 🐾
              </span>

              <button
                css={Button.mainPinkButton({
                  isDisabled: false,
                  width: "100%", // 버튼 너비
                  height: "50px", // 버튼 높이
                })}
                onClick={() => {
                  // 버튼 클릭 시 동작
                }}
                style={{
                  marginTop: "80%",
                  marginLeft: "30%",
                }}
              >
                📅 일정 생성하기
              </button>
            </div>
          </div>
        </div>

        {/* 여행지 추천 */}
        <div
          css={css`
            padding: 20px;
            margin-top: 30%;
          `}
        >
          <h3 css={typo.Heading3}>🐶 여행지 추천</h3>
          <div
            css={css`
              display: flex;
              gap: 10px;
              margin-top: 10px;
            `}
          >
            <button
              css={Button.grayBorderButton({
                width: "100px",
              })}
            >
              경기도
            </button>
            <button
              css={Button.grayBorderButton({
                width: "100px",
              })}
            >
              서울특별시
            </button>
            <button
              css={Button.grayBorderButton({
                width: "100px",
              })}
            >
              인천광역시
            </button>
          </div>
        </div>

        {/* 다가오는 여행 */}
        <div
          css={css`
            padding: 20px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <h3 css={typo.Heading3}>🏝️ 다가오는 여행</h3>
            <button style={{ fontSize: "25px" }} onClick={toggleComingTravel}>
              {showComingTravel ? "⌃" : "⌄"}
            </button>
          </div>
          {showComingTravel && (
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <TravelForm
                imageUrl="https://via.placeholder.com/80" // 예제 이미지 URL
                travelName="도쿄 여행"
                date="2024.11.19"
                dogCount={1}
              />
              <TravelForm
                imageUrl="https://via.placeholder.com/80" // 예제 이미지 URL
                travelName="삿포로 여행"
                date="2024.11.27 - 11.29"
                dogCount={1}
              />
            </div>
          )}
        </div>

        {/* 지난 여행 */}
        <div
          css={css`
            padding: 20px;
            margin-bottom: 100px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <h3 css={typo.Heading3}>🗺️ 지난 여행</h3>
            <button style={{ fontSize: "25px" }} onClick={togglePastTravel}>
              {showPastTravel ? "⌃" : "⌄"}
            </button>
          </div>
          {showPastTravel && (
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <TravelForm
                imageUrl="https://via.placeholder.com/80" // 예제 이미지 URL
                travelName="도쿄 여행"
                date="2024.11.19"
                dogCount={1}
              />
              <TravelForm
                imageUrl="https://via.placeholder.com/80" // 예제 이미지 URL
                travelName="삿포로 여행"
                date="2024.11.27 - 11.29"
                dogCount={1}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
