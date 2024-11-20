import { Bell, HeaderBackArrow } from "../../assets/svg";
import { LayoutContainer } from "../../styles/ui";
import { typo } from "../../styles/typo";
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
    <div css={LayoutContainer.HeaderContainer}>
      <HeaderBackArrow
        width={24}
        onClick={handleBackButtonClick}
        style={{ cursor: "pointer" }} // 수정
      />
      <span css={typo.Body3}>{title}</span>
      <Bell
        width={21}
        onClick={handleBellButtonClick}
        style={{ cursor: "pointer" }}
      />{" "}
      {/* 수정 */}
    </div>
  );
}
