import { useEffect, useState } from "react";
import { LoadingBar, MainPinkButton, Text } from "../../../components";
import { useGetFavoritesList } from "../../../queries";
import colors from "../../../styles/colors";
import { BookMarkList } from "../components";
import { allListWrapper, bottomButtonStyle, contentWrapper, countWrapper, wrapper } from "./index.styles";
import { FavoritesListType } from "../../../interfaces/favorites";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import usePageMeta from "../../../utils/usePageMeta";

export default function MyBookMark(){
    usePageMeta("GATE | 내 즐겨찾기", 'GATE 내 즐겨찾기'); //seo 검색 최적화
    const {isLoggedIn} = useAuthStore();
    const navigate = useNavigate();
    const {data : bookMarkList, isLoading} = useGetFavoritesList(null)
    const [count, setCount] = useState<number>(0)
    console.log(bookMarkList)
    useEffect(() => {
        if(!isLoggedIn){
            navigate('/login')
        }
        if (bookMarkList) {
            setCount(bookMarkList.length);
        }
    }, [bookMarkList, isLoggedIn, navigate]);

    if(isLoading){ return(<LoadingBar/>)}

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
                            key={bookmark.placeId}
                            placeId={bookmark.placeId}
                            placeName={bookmark.placeName}
                            roadAddress={bookmark.roadAddress}
                            latitude={bookmark.latitude}
                            longitude={bookmark.longitude}
                            photoUrl={bookmark.photoUrl}
                            reviewNum={bookmark.reviewNum}
                            starAvg={bookmark.starAvg}
                        />
                    )}
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton width="100%" onClick={()=> navigate('/place')}>즐겨찾기 추가</MainPinkButton>
                </div>
            </div>
        </div>
    )
}