import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
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
