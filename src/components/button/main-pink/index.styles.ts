import { css } from "@emotion/react";
import colors from "../../../styles/colors";

interface Props{
    isDisabled? : boolean; 
    width?: string;
    height?: string
}
export const buttonStyles = ({isDisabled, width='100%', height='53px'} : Props) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    color : ${colors.color.White1};
    background-color: ${isDisabled ? colors.color.Gray6 : colors.color.MainColor};
    cursor: pointer;

    &:hover{
        background-color: ${colors.color.MainColor};
        color: ${colors.color.White1};
    }
`