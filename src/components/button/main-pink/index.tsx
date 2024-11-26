import Text from "../../text";
import { buttonStyles } from "./index.styles";

interface Props {
  onClick?: () => void;
  width?: string;
  height?: string;
  title: string;
  isDisabled?: boolean;
}

export default function MainPinkButton({
  onClick,
  width,
  height,
  isDisabled,
  title,
}: Props) {
  return (
    <button onClick={onClick} css={buttonStyles({ width, height, isDisabled })}>
      <Text type="Label3">{title}</Text>
    </button>
  );
}
