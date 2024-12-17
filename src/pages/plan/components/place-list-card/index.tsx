import { useEffect, useState } from "react";
import { CheckIcon, GrayPlusIcon, ReviewCount, Star } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { favoriteCount, imageItem, imageWrapper, titleWrapper, wrapper } from "./index.styles";
import { FavoritesListType } from "../../../../interfaces";
import usePlanStore from "../../../../stores/usePlanStore";
import { SelectPlaceType } from "../../../../interfaces";
import { notify } from "../../../../utils/constants";

interface Props extends FavoritesListType{
    setSelectItems?: React.Dispatch<React.SetStateAction<SelectPlaceType[]>>;
    selectItems?: SelectPlaceType[]; // selectItems를 props로 받음
}

export default function PlaceListCard({placeName, roadAddress, placeId, photoUrl, reviewNum, starAvg, latitude, longitude, setSelectItems, selectItems} : Props){
    const {setPlaceIds} = usePlanStore();
    const [isSelect, setIsSelect] = useState(false);

    useEffect(() => {
        const isAlreadySelected = selectItems.some((item) => item.placeId === placeId);
        setIsSelect(isAlreadySelected);
    }, [selectItems, placeId]);

    const handlePlusButtonClick = () => { // 장소 선택
        if(selectItems.length>=10){
            notify({
                type: "warning",
                text: "최대 10개까지 선택할 수 있어요"
            })
            return
        }

        if (!isSelect) { //선택되지 않았던 거라면 추가
            const newItem : SelectPlaceType = { placeId, placeName, latitude, longitude, photoUrl, roadAddress, reviewNum, starAvg }
            setSelectItems((prevSelectItems) => [
                ...prevSelectItems, newItem
                
            ]); //선택된 리스트 정보들의 배열 업데이트
            setPlaceIds(placeId) //placeIds 배열을 같이 업데이트
            // setIsSelect(true);
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
                <img css={imageItem} src={photoUrl || '/images/stash_pin-place.png'}></img>
            </div>
            <div css={titleWrapper}>
                <Text type="Body2">{placeName}</Text>
                <Text type="Label21">{roadAddress}</Text>
                <div css={favoriteCount}>
                    <ReviewCount width={16}/> <Text type="Label3">{reviewNum || 0}</Text>
                    <Star width={20}/><Text type="Label3">{starAvg || 0}</Text>
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