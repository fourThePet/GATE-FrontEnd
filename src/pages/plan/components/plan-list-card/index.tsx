import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { listCardWrapper, numberLabel, wrapper } from "./index.styles";

interface Props {
    sequence : number
}
export default function PlanListCard({sequence} : Props){
    return(
        <div css={wrapper}>
            <label css={numberLabel}>
                <Text type="Label21" color={colors.color.White1}>{sequence}</Text>
            </label>
            <div css={listCardWrapper}>

            </div>
        </div>
    )
}