import { CloseIcon } from "../../assets/svg";
import { LayoutContainer } from "../../styles/ui";

type Props = {
    handleBackButtonClick?: () => void; // 선택적 속성으로 변경
  };
export default function CloseHeader({handleBackButtonClick} : Props) {
  return (
    <div css={LayoutContainer.HeaderContainer}>
        <CloseIcon width={16} onClick={handleBackButtonClick} />
    </div>
  );
}
