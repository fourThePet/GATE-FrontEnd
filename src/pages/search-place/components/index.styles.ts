import { css } from "@emotion/react";
import colors from "../../../styles/colors";

export const headerContainerStyle = css`
  display: flex;
  align-items: center;
`;

export const searchBarWrapperStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  background: ${colors.color.Gray6};
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 12px;
  margin: 20px 40px;
  height: 4.5vh;
`;

export const searchInputStyle = css`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: ${colors.color.Black};
  ::placeholder {
    color: ${colors.color.Gray3};
  }
`;

export const searchIconStyle = css`
  font-size: 24px;
  cursor: pointer;
  margin-right: 15px;
`;

export const filterWrapperStyle = css`
  cursor: pointer;
`;

export const mapStyle = css`
  width: 100%;
  height: 85vh;
  /* flex: 1; */
`;
