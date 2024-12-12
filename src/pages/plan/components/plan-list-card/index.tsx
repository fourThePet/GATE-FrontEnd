import { Text } from "../../../../components";
import { PlaceType } from "../../../../interfaces";

import colors from "../../../../styles/colors";
import SequenceLabel from "../sequence-label";
import { detailInfoWrapper, listCardWrapper, titleWrapper, wrapper } from "./index.styles";

interface Props {
    sequence : number;
    place : PlaceType
}
export default function PlanListCard({sequence, place} : Props){
    return(
        <div css={wrapper}>
            <SequenceLabel backgroundColor={colors.color.Sequence}>{sequence}</SequenceLabel>
            <div css={listCardWrapper}>
                <div css={titleWrapper}>
                    <Text type="Body2">{place.name}</Text>
                </div>
                <div css={detailInfoWrapper}>
                    <Text type="Label21" color={colors.color.Gray1}>{place.category}</Text>
                </div>
            </div>
        </div>
    )
}