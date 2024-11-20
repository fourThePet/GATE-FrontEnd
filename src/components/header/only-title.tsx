import { LayoutContainer, Block } from "../../styles/ui";
import { typo } from "../../styles/typo";
type Props = {
  title?: string; // title을 선택적 속성으로 변경
  handleBackButtonClick?: () => void; // 선택적으로 받을 수 있음
};

export default function OnlyTitleHeader({ title }: Props) {
  return (
    <div css={LayoutContainer.HeaderContainer}>
      <div css={Block.FlexBox}>
        {title && <span css={typo.Body2}>{title}</span>}
      </div>
    </div>
  );
}
