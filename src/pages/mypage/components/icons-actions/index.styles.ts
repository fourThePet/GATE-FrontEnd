import { css } from "@emotion/react";
import colors from "../../../../styles/colors";

export const wrapper = css`
    top: 20px;
    display: flex;
    justify-content: space-around; 
    align-items: center; 
    padding: 10px;
    border-radius: 5px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    
    max-width: 80px; 
    height: 40px;
    z-index: 10;
    position: absolute;
    background-color: ${colors.color.White1};
`

export const icon = css`
    cursor: pointer;
`