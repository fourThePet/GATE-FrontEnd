import { css } from "@emotion/react";
import { Styles } from "react-modal";

export const wrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    
`
export const closeButton = css`
    display: flex;
    width: 100%;
`
export const buttonStyle = css`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: auto;
`

export const subTitleStyle = css`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`
const modalStyles : Styles= {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)", // 배경 오버레이 설정
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000, // z-index 설정
    },
    content: {
        position: "relative",
        width: "100%",
        maxWidth : "300px",
        maxHeight : "220px",
        height: "100%",
        margin: "0 auto",
        borderRadius: "16px",
        backgroundColor: "#fff",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        border: "none",
        overflow: "hidden",
        inset: "0px"
    },
};

export default modalStyles;
