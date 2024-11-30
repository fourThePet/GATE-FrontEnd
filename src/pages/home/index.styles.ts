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
