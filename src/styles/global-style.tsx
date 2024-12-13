import { Global, css } from "@emotion/react";
import "./font.css";
const defaultStyles = css`
  :root {
    font-family: "Pretendard Variable", "Pretendard", "-apple-system",
      "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif";
    width: 100%;
    height: 100%;
    color: black;
    background-color: #f2f2f7;
    /* 테마별 색상 바꾸기 */
    --toastify-color-light: #fff;
    --toastify-color-dark: #F1729B;
    --toastify-color-info: #3498db;
    --toastify-color-success: #07bc0c;
    --toastify-color-warning: #f1c40f;
    --toastify-color-error: #e74c3c;
    --toastify-color-transparent: rgba(255, 255, 255, 0.7);

    /* 테마별 아이콘 색상 바꾸기 */
    --toastify-icon-color-info: var(--toastify-color-info);
    --toastify-icon-color-success: var(--toastify-color-success);
    --toastify-icon-color-warning: var(--toastify-color-warning);
    --toastify-icon-color-error: var(--toastify-color-error);

    /* 기본 적용 스타일 바꾸기 */
    --toastify-toast-max-width: 600px;
    --toastify-toast-width: 480px;
    --toastify-toast-background: #fff;
    --toastify-toast-min-height: 32px;
    --toastify-toast-max-height: 60px;
    --toastify-font-family: sans-serif;
    --toastify-z-index: 9999;

    --toastify-text-color-light: #757575;
    --toastify-text-color-dark: #fff;

    //Used only for colored theme
    --toastify-text-color-info: #fff;
    --toastify-text-color-success: #fff;
    --toastify-text-color-warning: #fff;
    --toastify-text-color-error: #fff;

    --toastify-spinner-color: #616161;
    --toastify-spinner-color-empty-area: #e0e0e0;

    // Used when no type is provided
    // toast("**hello**")
    --toastify-color-progress-light: linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    );
    // Used when no type is provided
    --toastify-color-progress-dark: #bb86fc;
    --toastify-color-progress-info: var(--toastify-color-info);
    --toastify-color-progress-success: var(--toastify-color-success);
    --toastify-color-progress-warning: var(--toastify-color-warning);
    --toastify-color-progress-error: var(--toastify-color-error);
  }
  * {
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
    font-family: inherit;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  *::before,
  *::after {
    box-sizing: border-box !important;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
  }
  a {
    outline: none;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  button {
    outline: none;
    border: none;
    cursor: pointer;
    background: none;
    padding-block: 0;
    padding-inline: 0;
  }
  textarea {
    border: none;
    resize: none;
    outline: none;
  }
  input {
    outline: none;
    border: none;
    background: none;
  }
  .Toastify__toast-container{
    bottom: 65px !important;
    margin: 0;
  }
`;
const GlobalStyle = () => {
  return <Global styles={defaultStyles} />;
};
export default GlobalStyle;
