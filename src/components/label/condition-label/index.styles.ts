import { css } from "@emotion/react";
import colors from "../../../styles/colors";

export const labelWrapper = (isSelected : boolean) => css`
    border-radius: 20px;
    width: auto;
    padding: 4px 16px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    background-color: ${isSelected ? colors.color.MainColor : colors.color.White1};
    border: 1px solid  ${isSelected ? colors.color.MainColor : colors.color.Gray4};
`