/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  Top1,
  Top2,
  Top3,
  Top4,
  Top5,
  Top6,
  Top7,
  Top8,
  Top9,
  Top10,
} from "../../../assets/svg";
import { typo } from "../../../styles/typo";

export default function Best10() {
  const items = [
    <Top1 />,
    <Top2 />,
    <Top3 />,
    <Top4 />,
    <Top5 />,
    <Top6 />,
    <Top7 />,
    <Top8 />,
    <Top9 />,
    <Top10 />,
  ];

  return (
    <div css={wrapperStyle}>
      <h2 css={typo.Heading3}>인기 급상승 🔥</h2>
      <h3 css={typo.Heading4} style={{ color: " #888" }}>
        국내 장소 Best 10
      </h3>
      <ScrollContainer css={scrollContainerStyle} horizontal vertical={false}>
        <div css={contentContainerStyle}>
          {items.map((item, index) => (
            <div key={index} css={imageContainerStyle}>
              {item}
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
}

// 스타일 정의
const wrapperStyle = css`
  padding: 10px;
  margin-top: -30px;
  margin-left: 20px;
  margin-right: 20px;
`;

const scrollContainerStyle = css`
  overflow-x: auto; /* 가로 스크롤 활성화 */
  white-space: nowrap; /* 줄바꿈 방지 */
  cursor: grab; /* 드래그 커서 표시 */

  &::-webkit-scrollbar {
    height: 8px; /* 가로 스크롤바 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const contentContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 180px;
  /* gap: 1px; */
  width: max-content;
  //background-color: #f5f5f5;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const imageContainerStyle = css`
  width: 200px; /* 가로 길이를 원하는 값으로 설정 */
  height: 100%; /* 높이는 그대로 유지 */
  position: relative; /* 이미지 배치를 위한 상대 위치 설정 */
  display: flex;
  align-items: flex-start; /* 아이템 상단 정렬 */
  justify-content: flex-start;
  box-sizing: border-box;
  overflow: hidden;
  /* background-color: #322e2e; */
  transition: transform 0.3s ease; /* 부드러운 전환 효과 */
  margin-top: 10px;

  &:hover {
    transform: scale(1.1); /* hover 시 확대 */
    z-index: 1; /* hover 시 다른 요소보다 위로 올리기 */
  }

  svg {
    position: absolute; /* 이미지의 위치를 고정 */
    top: 10;
    left: 10;
    width: auto; /* 이미지의 가로 크기 유지 */
    height: 100%; /* 이미지의 높이 유지 */
    object-fit: cover; /* 이미지가 컨테이너를 채우도록 설정 */
    transition: transform 0.3s ease; /* 부드러운 전환 효과 */
  }

  &:hover svg {
    transform: scale(1); /* hover 시 이미지 확대 */
  }
`;
