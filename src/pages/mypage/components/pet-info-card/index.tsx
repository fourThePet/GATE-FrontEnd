import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { imageStyle, line, petInfo, wrapper } from "./index.styles";
import { DogsInfoType } from "../../../../interfaces";
import { translateGender, translateSize } from "../../../../utils/translations";



export default function PetInfoCard({name, age, birthDay, imageUrl, size, gender} : DogsInfoType ){
    
    return(
        <div css={wrapper}>
            <div css={imageStyle}>
                {imageUrl ? (
                    <img src={imageUrl} css={imageStyle}/>
                ) : ( <img src="/images/default_profile.png" css={imageStyle}/>)
                }
               
            </div>
            <Text type="Label2">{name}</Text>
            <hr color={colors.color.Gray5} css={line}/>
            <div css={petInfo}>
                <Text type="Label4" color={colors.color.Gray1}>{birthDay} {`(만 ${age}세)`}</Text>
                <Text type="Label4" color={colors.color.Gray1}> {translateSize(size)}</Text>
                <Text type="Label4" color={colors.color.Gray1}>{translateGender(gender)}</Text>
            </div>
        </div>
    )
}