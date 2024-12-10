import { useState } from "react";
import { CheckIcon, GrayPlusIcon, HeartFill, Star } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { favoriteCount, imageItem, imageWrapper, titleWrapper, wrapper } from "./index.styles";

export default function PlaceListCard(){
    const [isSelect, setIsSelect] = useState(false)
    const handlePlusButtonClick = () =>{
        setIsSelect((prev) => !prev)
    }
    return(
        <div css={wrapper}>
            <div css={imageWrapper}>
                <img css={imageItem} src="/images/review_ex.png"></img>
            </div>
            <div css={titleWrapper}>
                <Text type="Body2">더왈츠</Text>
                <Text type="Label21">서울특별시</Text>
                <div css={favoriteCount}>
                    <HeartFill width={16}/> <Text type="Label3">10</Text>
                    <Star width={20}/><Text type="Label3">10</Text>
                </div>
            </div>
            <div>
                {isSelect ? (
                    <CheckIcon width={48} onClick={handlePlusButtonClick}/>
                ) : (
                    <GrayPlusIcon width={48} onClick={handlePlusButtonClick}/>
                )}
            </div>
        </div>
    )
}