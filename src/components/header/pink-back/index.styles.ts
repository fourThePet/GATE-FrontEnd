import { css } from "@emotion/react";
import colors from "../../../styles/colors";

export const wrapper = css`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 79px;
    max-width: 600px;
    background-color: ${colors.color.MainColor};
    z-index: 10;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`