import { HeaderLogo, Bell } from "../../assets/svg";
import { LayoutContainer } from "../../styles/ui";

type Props = {
  handleBellButtonClick: () => void;
};

export default function LogoBellHeader({ handleBellButtonClick }: Props) {
  return (
    <div css={LayoutContainer.HeaderContainer}>
      <HeaderLogo width={150} />
      <Bell width={30} cursor="pointer" onClick={handleBellButtonClick} />
    </div>
  );
}
