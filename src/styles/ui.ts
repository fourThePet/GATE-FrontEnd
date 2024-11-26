import styled from "styled-components";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

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

export const PageWrapper = {
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
};

// 페이지 및 컨테이너 스타일
export const LayoutContainer = {
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
  width: 100%;
  height: 2px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;

export const Divider2 = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;
