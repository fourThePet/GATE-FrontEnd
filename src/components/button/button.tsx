import { css } from "@emotion/react";

export const Button = {
  mainPinkButton: ({
    isDisabled,
    width = "100%",
    height = "53px",
  }: {
    isDisabled: boolean;
    width?: string;
    height?: string;
  }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    color: #ffffff;
    background-color: ${isDisabled ? "#e8e8e8" : "#F1729B"};
    cursor: ${isDisabled ? "not-allowed" : "pointer"};

    &:hover {
      background-color: #d04578; /* hover 시 배경색 변경 */
    }
  `,

  mainWhiteButton: ({
    width = "100%",
    height = "53px",
  }: {
    width?: string;
    height?: string;
  }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    color: #8e8e93;
    background-color: #f3f4f6;

    &:hover {
      background-color: #8e8e93;
      color: #f3f4f6;
    }
  `,

  grayBorderButton: ({
    width = "273px",
    height = "53px",
  }: {
    width?: string;
    height?: string;
  }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    border: 1px solid #bbbbbb;
    color: #000000;
    background-color: #ffffff;
    cursor: pointer;
  `,

  whiteBorderButton: ({
    width = "100%",
    height = "53px",
  }: {
    width?: string;
    height?: string;
  }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    border: 1px solid #ffffff;
    color: #000000;
    background-color: #f3f4f6;

    &:hover {
      background-color: #b03a60; /* hover 시 배경색 변경 */
    }
  `,

  darkPinkButton: ({
    width = "100%",
    height = "53px",
  }: {
    width?: string;
    height?: string;
  }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    color: #ffffff;
    background-color: #d04578;

    &:hover {
      background-color: #b03a60; /* hover 시 배경색 변경 */
    }
  `,

  pinkBorderButton: ({
    width = "320px",
    height = "33px",
  }: {
    width?: string;
    height?: string;
  }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 30px;
    border: 1px solid #f1729b;
    color: #f1729b;
    cursor: pointer;
    background-color: transparent;
  `,

  noBorderGrayButton: (isSoldOut: boolean) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 273px;
    min-width: 180px;
    height: 53px;
    border-radius: 19px;
    color: ${isSoldOut ? "#939292" : "#f1729b"};
    background-color: ${isSoldOut ? "#F8F8F8" : "#fff"};
    cursor: ${isSoldOut ? "not-allowed" : "pointer"};
    border: ${isSoldOut ? "none" : "2px solid #F8A8C2"};
  `,

  smallGrayButton: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px; /* 너비를 적당하게 설정 */
    height: 25px; /* 높이 설정 */
    border-radius: 12.5px; /* 둥근 모서리 */
    color: #939292; /* 텍스트 색상 */
    background-color: #f0f1f5; /* 배경색 */
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0; /* hover 시 배경색 변경 */
    }

    &:active {
      background-color: #d0d0d0; /* active 시 배경색 */
    }
  `,
};
