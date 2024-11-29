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
  padding: 16px;
  margin-left: 20px;
  margin-top: -30px;
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
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 활성화 */
  gap: 8px; /* 이미지 사이 간격 줄이기 */
  width: max-content; /* 내용물 너비에 맞춤 */
`;

const imageContainerStyle = css`
  flex: 0 0 calc(20% - 10px); /* 가로 5개 배치, 간격 줄이기 */
  box-sizing: border-box;
  overflow: hidden;
  width: 140px; /* 이미지 너비 줄이기 */
  height: 140px; /* 이미지 높이 줄이기 */
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
