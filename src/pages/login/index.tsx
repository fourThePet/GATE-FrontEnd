import { LoginLogo } from "../../assets/svg";
import { Text } from "../../components";
import colors from "../../styles/colors";
import usePageMeta from "../../utils/usePageMeta";
import KakaoButton from "./components/kakao-button";
import { logoWrapper, wrapper } from "./index.styles";

export default function Login(){
    usePageMeta("GATE | 로그인", 'GATE 로그인 화면'); //seo 검색 최적화
    return (
        <div css={wrapper}>
            <div css={logoWrapper}>
                <LoginLogo width={120}/>
                <Text type="Body3" color={colors.color.Gray1}>반려견과 행복의 문을 여는 순간</Text>
            </div>
            <KakaoButton/>
        </div>
        
    )
}