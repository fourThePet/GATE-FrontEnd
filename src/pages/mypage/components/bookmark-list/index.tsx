import { useNavigate } from "react-router-dom";
import { MenuIcon, MyBookmark } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { FavoritesListType } from "../../../../interfaces/favorites";
import colors from "../../../../styles/colors";
import { listWrapper, wrapper } from "./index.styles";



export default function BookMarkList({placeid, placeName, roadAddress} : FavoritesListType){
    const navigate = useNavigate()
    return ( 
        <div css={wrapper}>
            <MyBookmark width={24}/>
            <div css={listWrapper} onClick={()=> navigate(`/place/detail/${placeid}`) }>
                <Text type="Body2">{placeName}</Text>
                <Text type="Label3" color={colors.color.Gray1}>{roadAddress}</Text>
            </div>
            <div>
                <MenuIcon width={16} />
            </div>
        </div>
    )
}