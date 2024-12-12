import { useNavigate } from "react-router-dom";
import { NotFoundIcon } from "../../assets/svg";
import { MainPinkButton, Text } from "../../components";
import { textWrapper, wrapper } from "./index.styles";
import colors from "../../styles/colors";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div css={wrapper}>
      <NotFoundIcon width={120} />
      <div css={textWrapper}>
        <Text type="Heading2">페이지를 찾지 못했어요</Text>
        <Text type="Label21" color={colors.color.Gray1}>
          페이지 주소가 맞는지 확인해주세요
        </Text>
      </div>
      <MainPinkButton
        width="200px"
        
        onClick={() => navigate("/")}
      >홈으로 이동</MainPinkButton>
    </div>
  );
}
