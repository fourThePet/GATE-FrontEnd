import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const resultsListStyle = css`
  list-style: none;
  padding: 0;
  margin: 16px;
`;

export const resultItemStyle = css`
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const buttonContainer = css`
  z-index: 10000;
  position: fixed;
  bottom: 32%;
  left: 50%;
  transform: translateX(-50%);
`;
