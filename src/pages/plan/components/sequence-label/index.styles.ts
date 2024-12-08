import { css } from "@emotion/react";

export const numberLabel = (backgroundColor : string) => css`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: ${backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    
`