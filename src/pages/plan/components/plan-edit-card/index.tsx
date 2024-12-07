import { GrayDeleteIcon, PlanChange } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { listCardWrapper, numberLabel, wrapper } from "./index.styles";

interface Props{
    sequence : number
}
export default function PlanEditCard({sequence} : Props){
    return(
        <div css={wrapper}>
            <div>
                <GrayDeleteIcon width={24} />
            </div>
            <div css={listCardWrapper}>
                <label css={numberLabel}>
                    <Text type="Label21" color={colors.color.White1}>{sequence}</Text>
                </label>
            </div>
            <div>
                <PlanChange width={24}/>
            </div>
        </div>
    )
}