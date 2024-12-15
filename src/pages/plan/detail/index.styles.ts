import { css } from '@emotion/react'
import colors from '../../../styles/colors'

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    /* overflow: hidden; //내부 콘텐츠만 스크롤 가능 */
    position: relative;
    padding : 79px 0;
`
export const wrapper = css`
    flex: 1; //나머지 공간을 차지
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 79px); /* 전체 화면 높이에서 패딩 제외 */
    overflow-y: auto;
`
export const deleteIcon = css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`
export const info = css`
    background-color: ${colors.color.MainColor};
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 30px;
`

export const dateWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-block: auto;
`

export const mapWrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
`

export const listWrapper = css`
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    gap: 12px;
    overflow-y: auto;
`

export const actionWrapper = css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

export const planWrapper = css`
    display: flex;
    width: 100%;
    overflow-y: auto;
    flex-direction: column;
    height: calc(100vh - 300px - 150px - 79px); /* 남은 높이 계산 */
    gap: 12px;
`
export const InputFieldStyle = css`
  border: none;
  outline: none;
  padding: 8px;
  flex: 1;
  font-size: 16px;
  background-color: transparent;
  
`;

export const datepickerCustomStyles = css`
    .react-datepicker-popper {
        z-index: 9999 !important; /* 다른 요소 위로 팝업 */
        
    }
    .date-picker-wrapper {
        position: relative;
        z-index: 9999; /* 다른 요소보다 높게 설정 */
    }
    .react-datepicker {
        position: absolute;
        z-index: 9999 !important; /* 달력 컴포넌트의 루트 요소 */
        top: 21%;
        left: 20%;
    }
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
