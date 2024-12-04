import { useNavigate } from "react-router-dom";
import { MenuIcon, MyBookmark } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { FavoritesListType } from "../../../../interfaces/favorites";
import colors from "../../../../styles/colors";
import { listWrapper, menuWrapper, wrapper } from "./index.styles";
import { useState } from "react";
import IconsActions from "../icons-actions";
import { usePatchFavorite } from "../../../../queries";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../queries/query-keys";



export default function BookMarkList({ placeId, placeName, roadAddress} : FavoritesListType){
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
    return ( 
        <div css={wrapper}>
            <MyBookmark width={24}/>
            <div css={listWrapper} onClick={()=> navigate(`/place/detail/${placeId}`) }>
                <Text type="Body2">{placeName}</Text>
                <Text type="Label3" color={colors.color.Gray1}>{roadAddress}</Text>
            </div>
            <div css={menuWrapper}>
                <MenuIcon width={16} onClick={handleMenuIconClick}/>
                {isIconVisible && (<IconsActions onDeleteButtonClick={handleDeleteClick}/>) }
            </div>
        </div>
    )
}