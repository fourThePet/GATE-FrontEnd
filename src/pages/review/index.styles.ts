import { css } from "@emotion/react";

export const starStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  .react-stars {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-stars span {
    font-size: 50px; /* 원하는 별 크기 */
    margin-right: 10px; /* 별 간격 */
    color: #e0e0e0; /* 비활성화된 별 색상 */
    transition: color 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */
  }

  .react-stars span:hover {
    color: #f1729b; /* 호버 시 활성화된 별 색상 */
    transform: scale(1.2); /* 호버 시 확대 효과 */
  }

  .react-stars span.filled {
    color: #f1729b !important; /* 활성화된 별 색상 */
  }
`;

export const tooltipStyle = css`
  position: absolute;
  bottom: -15px; /* 아이콘 아래에 위치 */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: #ffffff;
  color: #d04578;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  visibility: hidden; /* 기본적으로 숨김 */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

export const containerStyle = css`
  position: relative;
  display: inline-block;

  &:hover .tooltipStyle {
    visibility: visible;
    opacity: 1;
  }
`;
