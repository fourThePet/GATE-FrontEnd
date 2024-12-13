/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const wrapStyle = css`
  position: absolute;
  width: 250px;
  background: #111111;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: Arial, sans-serif;
`;

export const infoStyle = css`
  padding: 10px;
`;

export const titleStyle = css`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const closeStyle = css`
  cursor: pointer;
  font-size: 14px;
  color: #999;
`;

export const bodyStyle = css`
  display: flex;
  margin-top: 10px;
`;

export const imgStyle = css`
  width: 73px;
  height: 70px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const descStyle = css`
  flex: 1;
  font-size: 12px;
  color: #666;

  div {
    margin-bottom: 5px;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
