import { HeaderLogo } from "../../assets/svg";
import { LayoutContainer } from "../../styles/ui";

export default function LogoBellHeader() {
  return (
    <div css={LayoutContainer.HeaderContainer}>
      <HeaderLogo width={150} />
    </div>
  );
}
