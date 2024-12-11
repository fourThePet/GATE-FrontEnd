import { useNavigate } from "react-router-dom";
import { Logowithshadow } from "../../../assets/svg";
import { MainPinkButton, Text } from "../../../components";
import { wrapper } from "./index.styles";

export default function OnboardingCompletion(){
    const navigate = useNavigate()
    return (
        <div css={wrapper}>
            <Logowithshadow width={100}/>
            <Text type="Heading2">회원가입이 완료되었어요!</Text>
            <MainPinkButton width="200px" onClick={()=>navigate("/")}>홈으로 이동</MainPinkButton>
        </div>
    )
}