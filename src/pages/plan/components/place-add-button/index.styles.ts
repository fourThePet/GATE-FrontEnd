import { css } from "@emotion/react";
import colors from "../../../../styles/colors";

interface Props{
    isDisabled? : boolean; 
    width?: string;
    height?: string
}
export const buttonStyles = ({width='100px', height='32px'} : Props) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: ${width};
    height: ${height};
    border-radius: 100px;
    border: 1px solid ${colors.color.Pink};
    color : ${colors.color.White1};
    background-color: ${colors.color.Pink};
    cursor: pointer;

`