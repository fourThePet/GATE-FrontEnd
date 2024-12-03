import { css } from "@emotion/react";
import { Styles } from "react-modal";

// 모달 전체 배경
export const backgroundStyle = css`
  background-image: url('/images/onboarding-modal.jpg'); // 배경 이미지 경로
  background-size: cover; // 이미지가 전체를 덮도록 설정
  background-position: center; // 이미지를 중앙 정렬
  background-repeat: no-repeat; // 이미지 반복 방지
  width: 100%;
  height: 100%; // 배경을 모달 전체 크기에 맞춤
`;

export const wrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;
    align-items: center;
    padding: 20px;
`

export const closeIcon = css`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`


export const modalStyles : Styles= {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // 배경 오버레이 설정
      display: "flex",
      justifyContent: "center",
      zIndex: 1000, // z-index 설정
      padding: "0 0 80px 0",
      
    },
    content: {
        display : "flex",
        alignItems: "flex-end", // 하단 정렬
        padding: "0px",
        width: "100%",
        maxWidth : "600px",
        maxHeight : "300px",
        height : "100vh",
        margin: "0 auto",
        borderRadius: "16px 16px 0 0",
        backgroundColor: "#fff",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        border: "none",
        overflow: "hidden",
        inset : "auto 0 80px 0"
    },
};

