import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title?: string; // title을 선택적 속성으로 변경
  handleBackButtonClick?: () => void; // 선택적으로 받을 수 있음
};

export default function OnlyTitleHeader({ title }: Props) {
  return (
    <HeaderContainer>
      {title && <Text.TitleMenu300>{title}</Text.TitleMenu300>}
    </HeaderContainer>
  );
}
