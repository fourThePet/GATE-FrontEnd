import { css } from "@emotion/react";

export const searchBarWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 25px;
  margin: 30px;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 25px;
  margin: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const categoryItemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px; /* 기본 너비 */
  height: 80px; /* 기본 높이 */
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
