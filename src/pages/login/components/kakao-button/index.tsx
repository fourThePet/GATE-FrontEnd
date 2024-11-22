import { KakaoLogo } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { buttonWrapper } from "./index.styles";

export default function KakaoButton(){
    return (
        <>
            <button css={buttonWrapper}>
                <KakaoLogo width={24}/>
                <Text type="Label1">카카오톡으로 시작하기</Text>
            </button>
        </>
    )
}