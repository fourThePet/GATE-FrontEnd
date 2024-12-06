import { labelWrapper } from "./index.styles";
import Text from "../../text";
import colors from "../../../styles/colors";
import { useState } from "react";

interface Props{
    children : React.ReactNode;
    initialSelected?: boolean;
    onToggle?: (isSelected: boolean) => void;
}
export default function ConditionLabel({ children, initialSelected=false, onToggle} : Props){
    const [isSelected, setIsSelected] = useState(initialSelected);
    const toggleSelection = () => {
        const newState = !isSelected;
        setIsSelected(newState);
        if (onToggle) {
          onToggle(newState); // 선택 상태를 상위로 전달
        }
      };
    return(
        <label css={labelWrapper(isSelected)} onClick={toggleSelection}>
            <Text type="Label21" color={isSelected? colors.color.White1 : colors.color.Black }>{children}</Text>
        </label>
    )
}