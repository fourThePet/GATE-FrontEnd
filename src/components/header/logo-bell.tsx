import { HeaderLogo, Bell } from "../../assets/svg";
import { HeaderContainer } from "../../styles/ui";

type Props = {
  handleBellButtonClick: () => void;
};

export default function LogoBellHeader({ handleBellButtonClick }: Props) {
  return (
    <HeaderContainer>
      <HeaderLogo width={150} />
      <Bell width={30} cursor="pointer" onClick={handleBellButtonClick} />
    </HeaderContainer>
  );
}
