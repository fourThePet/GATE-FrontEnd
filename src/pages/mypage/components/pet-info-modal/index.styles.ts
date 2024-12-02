import { Styles } from "react-modal";
import {css} from '@emotion/react'
import colors from '../../../../styles/colors'

export const wrapper = css`
    border-radius: 16px;
    border: 2px solid ${colors.color.MainColor};
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    overflow-y: auto;
    gap: 20px;
    
`

export const closeIcon = css`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`

export const imageStyle = css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`



export const petInfo = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`

export const formWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
`
export const infoWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 12px;
`


export const nameWrapper = css`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: flex-end;
    padding: 12px;
    /* justify-content: space-around; */
`

export const validMessage = css`
    height: 16px;
    padding: 4px 12px;
`

export const sizeWrapper = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
`

export const iconWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    gap: 8px;
`

export const ageWrapper = css`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 0 12px;
`

export const buttonGroupStyle = css`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const radioButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1; /* 버튼이 균등하게 배치되도록 설정 */
  /* width: 120px; */
  height: 40px;
  border: 1px solid ${colors.color.MainColor};
  border-radius: 20px;
  background-color: ${colors.color.MainColor};
  color: ${colors.color.White1 };
  

  input {
    display: none; /* 기본 radio 버튼 숨김 */
  }

  &:hover {
    border-color: ${colors.color.MainColor};
  }
`;

export const buttonStyle = css`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 12px;
    margin-top: auto;
`

const modalStyles : Styles= {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // 배경 오버레이 설정
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000, // z-index 설정
    },
    content: {
        position: "relative",
        width: "90%",
        maxWidth : "400px",
        maxHeight : "90vh",
        height: "80%",
        margin: "0 auto",
        // top: "50%", // 세로 정가운데
        // left: "50%", // 가로 정가운데
        // transform: "translate(-50%, -50%)", // 위치를 중앙으로 보정
        borderRadius: "16px",
        backgroundColor: "#fff",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        border: "none",
        overflow: "hidden",
        inset: "0px"
    },
};

export default modalStyles;
