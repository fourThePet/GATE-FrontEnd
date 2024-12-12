import { css } from "@emotion/react";
import colors from "../../styles/colors";

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

export const buttonContainer = ({
  isModalOpen,
  isFilterModalOpen,
}: {
  isFilterModalOpen;
  isModalOpen: boolean;
}) => css`
  z-index: 100;
  position: fixed;
  bottom: ${isModalOpen ? "50%" : "12%"};
  left: 50%;
  transform: translateX(-50%);
  display: ${isFilterModalOpen
    ? "none"
    : "block"}; // isFilterModalOpen이 true일 때 버튼 숨기기
`;

export const mapLocBtn = css`
  display: flex;
  flex-direction: column;
  z-index: 10;
  margin: 20px;
  cursor: pointer;
`;

export const modalOverlay = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  bottom: 0;
  height: 87%;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow-y: scroll;
  pointer-events: none; // 오버레이 클릭 방지
`;

export const modalContent = css`
  border-radius: 5% 5% 0 0;
  position: relative;
  top: 0;
  background-color: ${colors.color.White1};
  width: 100%;
  max-height: 80vh;
  height: 100%;
  padding-top: 2%;
  max-width: 600px;
  overflow-y: scroll;
  pointer-events: auto; // 모달 내부 클릭 허용
`;

export const noticeStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 8%;
`;

export const buttonWrapperStyle = css`
  position: relative;
  display: inline-block;
`;

export const tooltipStyle = css`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 15px;
  left: 100%;
  background-color: #ffffff;
  color: #f1729b;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  white-space: nowrap;
  border: 2px solid #f1729b;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 10;

  .button-wrapper:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
