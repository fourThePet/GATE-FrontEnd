import { css } from "@emotion/react";
import colors from "../../../../styles/colors";

export const headerContainerStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: row;
  height: 100px;
`;

export const searchBarWrapperStyle = css`
  flex: 1;
  display: flex;
  background: ${colors.color.Gray6};
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  margin: 20px 0 0 30px;
  height: 50%;
  width: 80%;
`;

export const searchInputStyle = css`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: ${colors.color.Black};
  ::placeholder {
    color: ${colors.color.Gray3};
  }
`;

export const searchIconStyle = css`
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
`;

export const filterButtonStyle = css`
  margin: 20px 30px 0 0;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: ${colors.color.White};
  color: ${colors.color.Gray5};
  border: 1px solid;
  border-radius: 30px;
  cursor: pointer;
  font-size: 18px;
  width: 17%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.color.MainColor};
  }

  &:hover .filterIconStyle {
    fill: white;
  }

  &:focus {
    outline: none;
  }
`;

export const categoryContainerStyle = css`
  display: flex;
  padding: 10px 0;
  align-items: center;
  margin: 10px 30px;
  gap: 10px;
  max-width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const categoryItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colors.color.Gray6};
  border-radius: 25px;
  width: 500px;
  height: 40px;
  padding: 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${colors.color.White1};
  z-index: 100;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    background-color: ${colors.color.MainColor};
    border: 2px solid ${colors.color.MainColor};
    color: ${colors.color.White1};
  }
`;

export const categoryButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const mapStyle = css`
  display: flex;
  width: 100%;
  height: 80vh;
  z-index: 1;
`;
