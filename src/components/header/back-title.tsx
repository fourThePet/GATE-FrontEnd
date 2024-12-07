import { HeaderBackArrow } from "../../assets/svg";
import { LayoutContainer } from "../../styles/ui";
import { typo } from "../../styles/typo";
import { Block } from "../block/block";
type Props = {
  title?: string; // 선택적 속성으로 설정
  handleBackButtonClick?: () => void; // 선택적 속성으로 변경
};
export default function BackTitleHeader({
  title, // 기본값 설정
  handleBackButtonClick,
}: Props) {
  return (
    <div css={LayoutContainer.HeaderContainer}>
      {handleBackButtonClick && (
        <HeaderBackArrow
          width={24}
          onClick={handleBackButtonClick}
          cursor="pointer"
        />
      )}
      <div css={Block.flexBlock} style={{ justifyContent: "center" }}>
        {title && <span css={typo.Heading3}>{title}</span>}
      </div>
    </div>
  );
}
