import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { listCardWrapper, numberLabel, wrapper } from "./index.styles";

interface Props {
    number : number
}
export default function PlanListCard({number} : Props){
    return(
        <div css={wrapper}>
            <label css={numberLabel}>
                <Text type="Label21" color={colors.color.White1}>{number}</Text>
            </label>
            <div css={listCardWrapper}>

            </div>
        </div>
    )
}