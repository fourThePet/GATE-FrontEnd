
import { Text } from "../../../../components";
import {  imageItem, imageWrapper, titleWrapper } from "./index.styles";

interface Props{
    imageUrl : string;
    name : string;
}
export default function SelectionImage({imageUrl, name} : Props){
    return(
        <div>
            <div css={imageWrapper}>
                <img css={imageItem} src={imageUrl || '/images/stash_pin-place.png'} alt={name}></img>
            </div>
            <div css={titleWrapper}>
                <Text type="Label3">{name}</Text>
            </div>
        </div>
    )
}