import { css } from "@emotion/react";
import colors from "../../../styles/colors";

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    overflow: hidden; /* 내부 콘텐츠만 스크롤 가능 */
    position: relative;
`
export const wrapper = css`
    flex: 1; /* 나머지 공간을 차지 */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    width: 100%;
    padding: 30px 30px 0;
    overflow-y: auto; /* 스크롤 활성화 */
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
    gap: 30px;
`

export const iconWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
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

export const radioButtonStyle = (isSelected: boolean) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1; /* 버튼이 균등하게 배치되도록 설정 */
  /* width: 120px; */
  height: 40px;
  border: 1px solid ${isSelected ? colors.color.MainColor : colors.color.Gray5};
  border-radius: 20px;
  background-color: ${isSelected ? colors.color.MainColor : "transparent"};
  color: ${isSelected ? colors.color.White1 : colors.color.Gray5};
  
  cursor: pointer;

  input {
    display: none; /* 기본 radio 버튼 숨김 */
  }

  &:hover {
    border-color: ${colors.color.MainColor};
  }
`;



export const bottomButtonStyle = css`
  position: sticky; /* 스크롤 시에도 화면 하단에 고정 */
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 18px;
  background-color: white; /* 배경색 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export const profileContainer = css`
  position: relative; /* 부모 요소를 기준으로 자식 요소 위치 설정 */
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* 원형으로 만들기 */
`;

export const profileIcon = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%; /* 원형으로 만들기 */
  
`;

export const cameraIcon = css`
  position: absolute; /* 부모를 기준으로 절대 위치 */
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* 아이콘 색상 */
  cursor: pointer;
`;

export const fileInput = css`
  display: none; /* 파일 업로드 버튼 숨김 */
`;
