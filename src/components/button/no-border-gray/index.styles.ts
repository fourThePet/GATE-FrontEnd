import { css } from "@emotion/react";
import colors from "../../../styles/colors";

interface Props {
  isDisabled: boolean;
  width?: string;
  height?: string;
}
export const buttonStyles = ({
  width = "100%",
  height = "53px",
  isDisabled,
}: Props) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: ${height};
  border-radius: 100px;
  border: 1px solid ${colors.color.White1};
  color: ${isDisabled ? colors.color.Gray4 : colors.color.MainColor};
  background-color: ${isDisabled ? colors.color.Gray6 : colors.color.White1};

  cursor: ${isDisabled ? "not-allowed" : "pointer"};
  border: ${isDisabled ? "none" : `2px solid ${colors.color.MainColor}`};

  &:hover {
    background-color: ${colors.color.MainColor};
    color: ${colors.color.White1};
  }
`;
