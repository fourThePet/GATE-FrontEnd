import { css } from "@emotion/react";

export const wrapper = css`
    margin: 0 auto;
    width: 100%;
    max-width: 480px;
    min-width: 320px;
    height: 100vh; /* 화면 전체 높이를 차지 */
    display: flex; /* 가운데 정렬을 위해 flex 사용 */
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    background-color: white; /* 회색 배경 */
`