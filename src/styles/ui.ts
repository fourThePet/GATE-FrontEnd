import styled from "styled-components";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

// Block 타입 정의
type StyleBlock = {
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  bgColor?: string;
  pointer?: boolean;
  gap?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
  maxWidth?: string;
};

export const Block = {
  // AbsoluteBox 스타일 정의
  AbsoluteBox: (props: StyleBlock) => css`
    position: ${props.position || "absolute"};
    top: ${props.top || "auto"};
    right: ${props.right || "auto"};
    bottom: ${props.bottom || "auto"};
    left: ${props.left || "auto"};
    z-index: ${props.zIndex || "auto"};
    width: ${props.width || "100%"};
    height: ${props.height || "auto"};
    min-width: 375px;
    max-width: ${props.maxWidth || "600px"};
    margin: ${props.margin || "0"};
    padding: ${props.padding || "0"};
    border: ${props.border || "none"};
    border-radius: ${props.borderRadius || "0"};
    background-color: ${props.bgColor || "transparent"};
    cursor: ${props.pointer ? "pointer" : "default"};
  `,

  // FlexBox 스타일 정의
  FlexBox: (props: StyleBlock) => css`
    display: flex;
    flex-direction: ${props.direction || "row"};
    justify-content: ${props.justifyContent || "flex-start"};
    align-items: ${props.alignItems || "stretch"};
    width: ${props.width || "100%"};
    height: ${props.height || "auto"};
    margin: ${props.margin || "0"};
    padding: ${props.padding || "0"};
    border: ${props.border || "none"};
    border-radius: ${props.borderRadius || "0"};
    background-color: ${props.bgColor || "transparent"};
    cursor: ${props.pointer ? "pointer" : "default"};
    gap: ${props.gap || "0"};
  `,
};

export const Button = {
  Confirm: (isDisabled: boolean) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 53px;
    border-radius: 100px;
    color: #ffffff;
    background-color: ${isDisabled ? "#e8e8e8" : "#F1729B"};
    cursor: ${isDisabled ? "not-allowed" : "pointer"};
  `,
  CartConfirm: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 53px;
    border-radius: 16px;
    color: #ffffff;
    background-color: #ffffff;
    border: 1px solid #f6ecd7;
    cursor: pointer;
  `,
  Select: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 273px;
    height: 53px;
    border-radius: 19px;
    color: #f1729b;
    background-color: #f8a8c2;
    cursor: pointer;
  `,

  RadiusButton: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 33px;
    border-radius: 30px;
    border: 1px solid #f1729b;
    color: #f1729b;
    cursor: pointer;
    background-color: transparent;
  `,
  CartButton: (isSoldOut: boolean) => css`
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

  // BuyButton 스타일
  BuyButton: (isSoldOut: boolean, border?: string) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 273px;
    height: 53px;
    border-radius: 19px;
    color: ${isSoldOut ? "#939292" : "#fff"};
    background-color: ${isSoldOut ? "#F8F8F8" : "#f1729b"};
    cursor: ${isSoldOut ? "not-allowed" : "pointer"};
    border: ${border || "none"};
  `,

  EditButton: css`
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

// 재사용 될 이미지
export const Img = {
  RoundIcon: css`
    display: block;
    width: 100%;
    height: auto;
    border-radius: 100%;
    cursor: pointer;
  `,
  AngledIcon: css`
    display: block;
    width: 100%;
    height: auto;
    border: none;
    cursor: pointer;
  `,
  BuyImg: css`
    width: 80px;
    height: 80px;
    object-fit: cover;
  `,
};

// 페이지 및 컨테이너 스타일
export const LayoutContainer = {
  PageWrapper: css`
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  HeaderContainer: css`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 79px;
    max-width: 600px;
    background-color: #ffffff;
    z-index: 10;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  NavContainer: css`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 99px;
    max-width: 600px;
    background-color: #ffffff;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 50px 0px;
  `,
};

export const Divider = styled.div`
  width: 90%;
  height: 2px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;

export const Divider2 = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;
