import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
`
export const blurBackground = css`
  position: relative;
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1); /* 반투명 검정 */
    backdrop-filter: blur(4px); /* 흐림 효과 */
    z-index: 15; /* 모달 아래 배경 흐리게 */
  }
`;

export const imageBlock = css`
  position: relative;
  width: 100%; /* 가로를 화면 전체로 설정 */
  height: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 14; /* 16:9 비율 */

  svg {
    width: 100%;
    height: auto; /* 세로 비율 유지 */
    object-fit: cover;
  }

  .text-overlay {
    position: absolute;
    z-index: 2;
    color: black;
  }
`

export const imageWrapper = css`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const mainImage =css`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
`

export const mainWrapper = css`
  position: absolute;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 220px;
  width: 100%;
`

export const mainTitle = css`
  width: 100%;
  padding: 30px;

`

export const recommendCity = css`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;

`

export const recommendLabel = css`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`

export const planWrapper = css`
  padding:10px 30px 80px;
`

export const planListWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0; 
  /* padding: 0 30px; */
  width: 100%;
`

export const tabStyle = (tab : string, activeTab : string) =>css`
  cursor: pointer;
  font-weight: ${activeTab === tab ? "bold" : "normal"};
  color: ${activeTab === tab? "#F1729B" : "#A4A4A4"};
  border-bottom: ${activeTab === tab
    ? "5px solid #F1729B"
    : "none"};
  padding-bottom: 10px;
  width: 160px;
  text-align: center;
`

export const buttonWrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const noDataText = css`
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`
export const PageWrapperStyle = css`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
`;

export const FixedHeaderStyle = css`
  background-color: #f1729b;
  color: white;
  z-index: 10;
  padding: 20px;
  text-align: left;
  margin-top: 75px;
`;

export const InputWrapperStyle = css`
  display: flex;
  align-items: center;
  padding: 8px;
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 500px;
`;

export const InputFieldStyle = css`
  border: none;
  outline: none;
  padding: 8px;
  flex: 1;
  font-size: 16px;
  background-color: transparent;
`;

export const CityListWrapperStyle = css`
  padding: 16px;
  margin-bottom: 80px;
`;

export const CityItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const CityInfoWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CityImageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const SelectButtonStyle = (isSelected: boolean) => css`
  background-color: ${isSelected ? "#f8f8f8" : "#f1729b"};
  color: ${isSelected ? "#f1729b" : "#fff"};
  border: 1px solid #f1729b;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
`;

export const FooterStyle = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  padding: 10px 18px;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); */
  z-index: 10;
`;

export const datepickerCustomStyles = css`
  .react-datepicker__day--selected {
    background-color: #D04578 !important;
    color: white !important;
    border-radius: 50%;
  }

  /* 선택된 날짜가 오늘인 경우에도 위 스타일 유지 */
  .react-datepicker__day--today.react-datepicker__day--selected {
    background-color: #D04578 !important;
    color: white !important;
  }

  /* 오늘 날짜 기본 스타일 */
  .react-datepicker__day--today {
    background-color: #f8a8c2;
    color: white !important;
    border-radius: 50%;
  }

  .react-datepicker__day:hover {
    background-color: #D04578 !important;
    color: white !important;
    border-radius: 50%;
  }

  .react-datepicker__day--outside-month {
    color: #ccc;
  }
`;

export const loadingWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`