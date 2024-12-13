import { GrayDeleteIcon, ReviewCount, Star } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { favoriteCount, imageItem, imageWrapper, titleWrapper, wrapper } from "./index.styles";

export default function SelectionPlaceList({placeName, roadAddress, photoUrl,reviewNum,starAvg, onClick}){
    return(
        <div css={wrapper}>
            <div css={imageWrapper}>
                <img css={imageItem} src={photoUrl || '/images/stash_pin-place.png'}></img>
            </div>
            <div css={titleWrapper}>
                <Text type="Body2">{placeName}</Text>
                <Text type="Label21">{roadAddress}</Text>
                <div css={favoriteCount}>
                    <ReviewCount width={16}/> <Text type="Label3">{reviewNum||0}</Text>
                    <Star width={20}/><Text type="Label3">{starAvg||0}</Text>
                </div>
            </div>
            <GrayDeleteIcon width={24} onClick={onClick}/>
        </div>
    )
}