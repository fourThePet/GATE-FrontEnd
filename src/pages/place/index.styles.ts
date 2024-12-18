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
  isFilterModalOpen: boolean;
  isModalOpen: boolean;
}) => css`
  z-index: 100;
  position: fixed;
  bottom: ${isModalOpen ? "8%" : "8%"};
  left: 50%;
  transform: translateX(-50%);
  display: ${isFilterModalOpen ? "none" : "block"};

  background: ${isModalOpen
    ? `linear-gradient(
        to top,
        ${colors.color.White1},
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0)
      )`
    : "transparent"};
  width: 100%;
  max-width: 600px;
  padding: 30px 0;
  text-align: center;

  button {
    background-color: ${colors.color.Maincolor};
    color: ${colors.color.White1};
    border: none;
    border-radius: 50px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
      transition: all 0.2s ease;
    }
  }
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
  pointer-events: none;
`;

export const modalContent = css`
  border-radius: 3% 3% 0 0;
  position: relative;
  top: 0;
  background-color: ${colors.color.White1};
  width: 100%;
  max-height: 79vh;
  height: 100%;
  padding-top: 2%;
  max-width: 600px;
  overflow-y: scroll;
  pointer-events: auto;
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
