import { labelWrapper } from "./index.styles";
import Text from "../../text";
import colors from "../../../styles/colors";
import { useState } from "react";

export default function ConditionLabel({ children}){
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected((prev) => !prev);
    };
    return(
        <label css={labelWrapper(isSelected)} onClick={toggleSelection}>
            <Text type="Label21" color={isSelected? colors.color.White1 : colors.color.Black }>{children}</Text>
        </label>
    )
}