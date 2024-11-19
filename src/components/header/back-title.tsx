import { HeaderBackArrow } from "../../assets/svg";
import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handleBackButtonClick: () => void;
};

export default function BackTitleHeader({
  title,
  handleBackButtonClick,
}: Props) {
  return (
    <HeaderContainer>
      <HeaderBackArrow
        width={24}
        onClick={handleBackButtonClick}
        cursor="pointer"
      />
      <Text.TitleMenu300>{title}</Text.TitleMenu300>
    </HeaderContainer>
  );
}
