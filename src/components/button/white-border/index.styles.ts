import { css } from "@emotion/react";
import colors from "../../../styles/colors";

interface Props{
    isDisabled? : boolean; 
    width?: string;
    height?: string
}
export const buttonStyles = ({width='100%', height='53px'} : Props) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    border: 1px solid ${colors.color.White1};
    color : ${colors.color.Gray1};
    background-color: ${colors.color.White2};
    cursor: pointer;

    &:hover{
        background-color: ${colors.color.MainColor};
        color: ${colors.color.White1};
    }
    &:active {
      background-color: ${colors.color.MainColor}; 
      color: ${colors.color.White1};
    }
`