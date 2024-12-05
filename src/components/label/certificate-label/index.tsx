import colors from "../../../styles/colors";
import Text from "../../text";
import { labelWrapper } from "./index.styles";

export default function CertificateLabel(){
    return(
        <label css={labelWrapper}>
            <Text type="Label3" color={colors.color.Blue}>인증</Text>
        </label>
    )
}