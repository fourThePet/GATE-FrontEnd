import { useState } from "react";
import { CheckIcon, GrayPlusIcon, HeartFill, Star } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { favoriteCount, imageItem, imageWrapper, titleWrapper, wrapper } from "./index.styles";
import { FavoritesListType } from "../../../../interfaces";

interface Props extends FavoritesListType{
    placeName? : string;
    placeId? : number;
    roadAddress?: string;
    setSelectItems?: React.Dispatch<React.SetStateAction<{ placeId: number, placeName: string }[]>>;
    selectItems?: { placeId: number, placeName: string }[]; // selectItems를 props로 받음
}

export default function PlaceListCard({placeName, roadAddress, placeId, setSelectItems, selectItems} : Props){
    
    const [isSelect, setIsSelect] = useState(false);

    const handlePlusButtonClick = () => { // 장소 선택
        const isAlreadySelected = selectItems.some(item => item.placeId === placeId);

        if (!isAlreadySelected) {
            // 선택되지 않았다면 placeId와 placeName을 함께 추가
            setSelectItems((prevSelectItems) => [
                ...prevSelectItems,
                { placeId, placeName }
            ]);
            setIsSelect(true);
        }
        setIsSelect(true);
    };

    const handleCheckButtonClick = () => { // 장소 선택 해제
        if (placeId) {
            setSelectItems((prevSelectItems) => 
                prevSelectItems.filter(item => item.placeId !== placeId) // 선택 해제 시 해당 placeId를 가진 항목 삭제
            );
        }
        setIsSelect(false);
    };
    
    return(
        <div css={wrapper}>
            <div css={imageWrapper}>
                <img css={imageItem} src="/images/review_ex.png"></img>
            </div>
            <div css={titleWrapper}>
                <Text type="Body2">{placeName}</Text>
                <Text type="Label21">{roadAddress}</Text>
                <div css={favoriteCount}>
                    <HeartFill width={16}/> <Text type="Label3">10</Text>
                    <Star width={20}/><Text type="Label3">10</Text>
                </div>
            </div>
            <div>
                {isSelect ? (
                    <CheckIcon width={48} onClick={handleCheckButtonClick}/>
                ) : (
                    <GrayPlusIcon width={48} onClick={handlePlusButtonClick}/>
                )}
            </div>
        </div>
    )
}