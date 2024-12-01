import { css } from "@emotion/react";

export const searchBarWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 25px;
  margin: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const searchIconStyle = css`
  font-size: 1.5rem;
  margin-right: 10px;
`;

export const searchInputStyle = css`
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #aaa;
  flex: 1;
`;

export const categoryWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px 30px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 25px;
  margin: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const categoryItemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; /* 기본 너비 */
  height: 100%; /* 기본 높이 */
  cursor: pointer;
  transition: transform 0.3s ease-in-out; /* 부드러운 확대 애니메이션 */

  &:hover {
    transform: scale(1.1); /* hover 시 10% 확대 */
  }

  span {
    font-size: 1rem;
    margin-top: 8px;
    color: #000;
  }
`;

export const containerStyle = css`
  width: 100%;
  /* text-align: center; */
  margin-top: 20px;
`;

export const sliderContainerStyle = css`
  width: 85%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */

  /* react-slick dots custom style */
  .slick-dots {
    bottom: 20px;
  }

  .slick-dots li button:before {
    color: #bbb;
    font-size: 8px;
  }

  .slick-dots li.slick-active button:before {
    color: #f1729b; /* 활성화된 dot 색상 */
  }
`;

export const imageWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const imageStyle = css`
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
  }
`;
//top10
export const wrapperStyle = css`
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const scrollContainerStyle = css`
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

export const contentContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 160px;
  /* gap: 1px; */
  width: max-content;
  //background-color: #f5f5f5;
  margin-bottom: 10px;
`;

export const imageContainerStyle = css`
  width: 180px; /* 가로 길이를 원하는 값으로 설정 */
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
