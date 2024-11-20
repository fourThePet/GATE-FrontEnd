import { css } from "@emotion/react";

export const PageContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  overflow: hidden;
  /* background-color: #ffffff; */
`;

export const HeaderContainer = css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 89px;
  max-width: 600px;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
