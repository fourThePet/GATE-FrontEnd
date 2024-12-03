import colors from "../../styles/colors";
import Text from "../text";
import { labelWrapper } from "./index.styles";

export default function FilterLabel({children}){
    return(
        <label css={labelWrapper}>
            <Text type="Label21" color={colors.color.White1}>{children}</Text>
        </label>
    )
}