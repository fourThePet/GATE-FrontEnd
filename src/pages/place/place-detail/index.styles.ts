import { css } from "@emotion/react";

export const PageContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
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

export const ContentContainer = css`
  padding: 30px;
  background-color: #fff;
  border-radius: 16px;
`;

export const BasicInfoContainer = css`
  padding:10px 30px;
  background-color: #fff;
  border-radius: 16px;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    margin-bottom: 10px;
  }
`;

//Progressbar
export const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
`;

export const barContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  padding: 10px 15px;
`;

export const labelStyle = css`
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

export const progressBarContainerStyle = css`
  flex: 2;
  height: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 30px;
`;

export const progressStyle = (width: number) => css`
  width: ${width}%;
  height: 100%;
  background-color: #f8a8c2;
  transition: width 0.5s ease-in-out;
`;

export const percentageStyle = css`
  flex: 0.5;
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  color: #f1729b;
`;

export const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin: auto auto;
  width: 100%;
`;

export const textWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const reviewButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px 30px;
  width: 100%;
`