import { useNavigate } from "react-router-dom";
import { MenuIcon, ReviewCount, Star } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { FavoritesListType } from "../../../../interfaces/favorites";
import { favoriteCount, imageItem, imageWrapper, menuWrapper, titleWrapper, wrapper } from "./index.styles";
import { useState } from "react";
import IconsActions from "../icons-actions";
import { usePatchFavorite } from "../../../../queries";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../queries/query-keys";



export default function BookMarkList({ placeId, placeName, roadAddress, latitude, longitude, photoUrl, starAvg,reviewNum} : FavoritesListType){
    const navigate = useNavigate();
    const deleteFavorite = usePatchFavorite();
    const queryClient = useQueryClient();
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false)
    const handleMenuIconClick = () => {
        setIsIconVisible((prev)=> !prev)
    }

    const handleDeleteClick = () => {
        
        if(placeId){
            deleteFavorite.mutate(placeId, {
                onSuccess: () => {
                  console.log("즐겨찾기 삭제");
                  queryClient.invalidateQueries({
                    queryKey : QUERY_KEYS.GET_FAVORITES_LIST
                  });
                },
            })

        }
    }

    const handleTitleClick = () => {
        navigate(`/place/detail/${placeId}?latitude=${latitude}&longitude=${longitude}` ,{ state: { placeId } })
    }

    return ( 
        <div css={wrapper}>
            <div css={imageWrapper} onClick={handleTitleClick}>
                <img css={imageItem} src={photoUrl}></img>
            </div>
            <div css={titleWrapper} onClick={handleTitleClick}>
                <Text type="Body2">{placeName}</Text>
                <Text type="Label21">{roadAddress}</Text>
                <div css={favoriteCount}>
                    <ReviewCount width={16}/> <Text type="Label3">{reviewNum}</Text>
                    <Star width={20}/><Text type="Label3">{starAvg}</Text>
                </div>
            </div>
            <div css={menuWrapper}>
                <MenuIcon width={16} onClick={handleMenuIconClick}/>
                {isIconVisible && (<IconsActions onDeleteButtonClick={handleDeleteClick}/>) }
            </div>
        </div>
    )
}