import { css } from "@emotion/react";

export const Imgblock = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    object-fit: cover; /* 배경 이미지를 꽉 채우도록 설정 */
  }

  .text-overlay {
    position: absolute;
    z-index: 2;
    // text-align: center; /* 텍스트 가운데 정렬 */
    color: black; /* 텍스트 색상 */
  }
`;

export const Greeting = css``;

export const Section = css`
  /* margin-bottom: 30px; */
`;
