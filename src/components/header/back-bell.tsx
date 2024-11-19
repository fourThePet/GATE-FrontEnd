import { Bell, HeaderBackArrow } from "../../assets/svg";
import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handleBackButtonClick: () => void;
  handleBellButtonClick: () => void;
};

export default function BackBellHeader({
  title,
  handleBackButtonClick,
  handleBellButtonClick,
}: Props) {
  return (
    <HeaderContainer>
      <HeaderBackArrow
        width={24}
        onClick={handleBackButtonClick}
        style={{ cursor: "pointer" }} // 수정
      />
      <Text.TitleMenu300>{title}</Text.TitleMenu300>
      <Bell
        width={21}
        onClick={handleBellButtonClick}
        style={{ cursor: "pointer" }}
      />{" "}
      {/* 수정 */}
    </HeaderContainer>
  );
}
