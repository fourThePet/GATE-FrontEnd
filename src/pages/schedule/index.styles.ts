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
