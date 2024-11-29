import { useState } from "react";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { imageStyle, line, petInfo, wrapper } from "./index.styles";

export default function PetInfoCard(){
    const [ name, setName ] = useState("")
    return(
        <div css={wrapper}>
            <div css={imageStyle}>
                <img src="/images/default_profile.png" css={imageStyle}/>
            </div>
            <Text type="Label2">{name}</Text>
            <hr color={colors.color.Gray5} css={line}/>
            <div css={petInfo}>
                <Text type="Label4" color={colors.color.Gray1}>{'2024-06-10'}{'(만 0세)'}</Text>
                <Text type="Label4" color={colors.color.Gray1}> {'소형'}</Text>
                <Text type="Label4" color={colors.color.Gray1}>{'여아'}</Text>
            </div>
        </div>
    )
}