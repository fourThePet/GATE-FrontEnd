import { HTMLAttributes, ReactNode } from "react";
import Text from "../../text";
import { buttonStyle, buttonStyles } from "./index.styles";

interface Props extends HTMLAttributes<HTMLButtonElement>{
  width?: string;
  height?: string;
  title?: string;
  isDisabled?: boolean;
  children : ReactNode
}

export default function MainPinkButton({
  width,
  height,
  isDisabled,
  children, 
  ...props
}: Props) {
  return (
    <button css={buttonStyles({ width, height, isDisabled })} {...props}>
      <Text type="Label2" css={buttonStyle}>{children}</Text>
    </button>
  );
}
