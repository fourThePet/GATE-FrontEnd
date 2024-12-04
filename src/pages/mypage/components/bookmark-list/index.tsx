import { useNavigate } from "react-router-dom";
import { MenuIcon, MyBookmark } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { FavoritesListType } from "../../../../interfaces/favorites";
import colors from "../../../../styles/colors";
import { listWrapper, menuWrapper, wrapper } from "./index.styles";
import { useState } from "react";
import IconsActions from "../icons-actions";
import { usePatchFavorites } from "../../../../queries";



export default function BookMarkList({ placeId, placeName, roadAddress} : FavoritesListType){
    const navigate = useNavigate();
    const {mutate: deleteFavorite} = usePatchFavorites()
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false)
    const handleMenuIconClick = () => {
        setIsIconVisible((prev)=> !prev)
    }

    const handleDeleteClick = () => {
        
        if(placeId){
            console.log(placeId)
            deleteFavorite(placeId)
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