// import { useNavigate } from "react-router-dom";
import { KakaoLogo } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { buttonWrapper } from "./index.styles";

export default function KakaoButton() {
  const handleKakaoLoginButtonClick = async () => {
    window.location.href = `${
      import.meta.env.VITE_BASE_URL2
    }/members/social-login/kakao`;
  };
  return (
    <>
      <button css={buttonWrapper} onClick={handleKakaoLoginButtonClick}>
        <KakaoLogo width={24} />
        <Text type="Label1">카카오톡으로 시작하기</Text>
      </button>
    </>
  );
}
