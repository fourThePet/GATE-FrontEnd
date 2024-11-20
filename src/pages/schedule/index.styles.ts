import styled from "styled-components";

export const Imgblock = styled.div`
  position: relative;
  margin-top: -100px;
  width: 100%;
  height: 800px; /* 원하는 높이 설정 */
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 배경 이미지를 꽉 채우도록 설정 */
  }

  .text-overlay {
    position: absolute;
    z-index: 2;
    /* text-align: center; */
    color: black; /* 텍스트 색상 */
  }
`;

export const Greeting = styled.div`
  strong {
    font-size: 18px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    color: #666;
  }
`;

export const Section = styled.div`
  margin-bottom: 30px;
`;
