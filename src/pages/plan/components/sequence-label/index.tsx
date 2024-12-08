import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { numberLabel } from "./index.styles";

interface Props{
    children : React.ReactNode;
    backgroundColor : string;
}
export default function SequenceLabel({backgroundColor, children} : Props){
    return(
        <label css={numberLabel(backgroundColor)}>
            <Text type="Label21" color={colors.color.White1}>
                {children}
            </Text>
        </label>
    )
}