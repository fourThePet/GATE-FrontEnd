import { css } from "@emotion/react";


export const buttonStyle = css`
    transition: background-color 0.3s ease;
`

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