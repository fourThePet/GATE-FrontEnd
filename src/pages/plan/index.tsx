import { useState } from "react";
import { Schedulemain } from "../../assets/svg";
import { PageWrapper } from "../../styles/ui";
import { Imgblock } from "./index.styles";
import { css } from "@emotion/react";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import { TravelForm } from "./components/travel-form";

export default function Plan() {
  const [showComingTravel, setShowComingTravel] = useState(true);
  const [showPastTravel, setShowPastTravel] = useState(true);

  const toggleComingTravel = () => setShowComingTravel((prev) => !prev);
  const togglePastTravel = () => setShowPastTravel((prev) => !prev);

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
              width: 100%; /* 가로를 화면 전체로 설정 */
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
                width: 100%; /* 화면 가로에 맞춤 */
                max-width: 100%; /* 최대 가로 크기 */
                height: auto; /* 비율 유지 */
                object-fit: cover; /* 이미지 꽉 채우기 */
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
                OO 님, 반갑습니다 <br /> GATE와 함께하는 일정을 세워볼까요? 🐾
              </span>
            </div>
            <button
              css={Button.mainPinkButton({
                isDisabled: false,
                width: "100%",
                height: "50px",
              })}
              style={{ marginLeft: "50%" }}
            >
              📅 일정 생성하기
            </button>
          </div>
        </div>

        {/* 여행지 추천 */}
        <div
          css={css`
            padding: 20px;
            /* margin-top: 20px; */
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
                imageUrl="https://via.placeholder.com/80"
                travelName="도쿄 여행"
                date="2024.11.19"
                dogCount={1}
              />
              <TravelForm
                imageUrl="https://via.placeholder.com/80"
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
                imageUrl="https://via.placeholder.com/80"
                travelName="도쿄 여행"
                date="2024.11.19"
                dogCount={1}
              />
              <TravelForm
                imageUrl="https://via.placeholder.com/80"
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
