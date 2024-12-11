import { css } from "@emotion/react";

export const Imgblock = css`
  position: relative;
  width: 100%; /* 가로를 화면 전체로 설정 */
  height: auto;
  display: flex;
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
`;

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
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #f7b0c4 !important;
    color: white !important;
    border-radius: 50%;
  }

  .react-datepicker__day--today {
    background-color: #f1729b !important;
    color: white !important;
    border-radius: 50%;
  }

  .react-datepicker__day:hover {
    background-color: #f7b0c4 !important;
    color: white !important;
  }

  .react-datepicker__day--outside-month {
    color: #ccc;
  }
`;
