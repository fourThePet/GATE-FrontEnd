import { WhiteBack } from "../../../assets/svg";
import { wrapper } from "./index.styles";
type Props = {
  title?: string; // 선택적 속성으로 설정
  handleBackButtonClick?: () => void; // 선택적 속성으로 변경
};
export default function PinkBackHeader({
  handleBackButtonClick,
}: Props) {
  return (
    <div css={wrapper}>
      {handleBackButtonClick && (
        <WhiteBack
          width={24}
          onClick={handleBackButtonClick}
          cursor="pointer"
        />
      )}
    </div>
  );
}
