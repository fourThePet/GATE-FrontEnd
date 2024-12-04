import { useEffect, useState } from "react";
import { MainPinkButton, Text } from "../../../components";
import { useGetFavoritesList } from "../../../queries";
import colors from "../../../styles/colors";
import { BookMarkList } from "../components";
import { allListWrapper, bottomButtonStyle, contentWrapper, countWrapper, wrapper } from "./index.styles";
import { FavoritesListType } from "../../../interfaces/favorites";
import { useNavigate } from "react-router-dom";

export default function MyBookMark(){
    const navigate = useNavigate();
    const {data : bookMarkList} = useGetFavoritesList()
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        if (bookMarkList) {
            setCount(bookMarkList.length);
        }
    }, [bookMarkList]);

    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={countWrapper}>
                    <Text type="Label21" color={colors.color.Gray1}>전체 
                        <Text type="Label21" color={colors.color.MainColor}> {count}</Text>개
                    </Text>
                </div>
                <div css={allListWrapper}>
                    {bookMarkList?.map((bookmark : FavoritesListType) => 
                        <BookMarkList
                            key={bookmark.placeid}
                            placeid={bookmark.placeid}
                            placeName={bookmark.placeName}
                            roadAddress={bookmark.roadAddress}
                        />
                    )}
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton width="100%" title="즐겨찾기 추가" onClick={()=> navigate('/place')}/>
                </div>
            </div>
        </div>
    )
}