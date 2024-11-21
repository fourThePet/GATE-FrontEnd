import { css } from "@emotion/react";
import colors from "../../../styles/colors";

interface Props{
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
    color : ${colors.color.Gray1};
    background-color: ${colors.color.White2};
    cursor: pointer;

    &:hover{
        background-color: ${colors.color.Gray1};
        color: ${colors.color.White2};
    }
`