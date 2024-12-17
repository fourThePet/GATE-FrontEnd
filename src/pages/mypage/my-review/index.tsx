import { useEffect, useState } from "react";
import { LoadingBar, Text } from "../../../components";
import { ReviewDataType } from "../../../interfaces";
import { useGetReviewsMy } from "../../../queries";
import colors from "../../../styles/colors";
import { ReviewList } from "../components";
import { contentWrapper, countWrapper, wrapper } from './index.styles';
import usePageMeta from "../../../utils/usePageMeta";

export default function MyReview(){
    usePageMeta("GATE | 내 리뷰내역", 'GATE 내 리뷰내역'); //seo 검색 최적화
    const {data : reviewList, isLoading} = useGetReviewsMy()
    const [count, setCount] = useState<number>(0)
    
    useEffect(()=>{
        if(reviewList?.length>0)
        setCount(reviewList.length)
    },[reviewList])
    if(isLoading){return(<LoadingBar/>)}
    return (
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={countWrapper}>
                    <Text type="Label21" color={colors.color.Gray1}>전체 
                        <Text type="Label21" color={colors.color.MainColor}> {count}</Text>개
                    </Text>
                </div>
                {reviewList?.map((review : ReviewDataType)=>
                    <ReviewList
                        key={review.id}
                        id={review.id}
                        placeName={review.placeName}
                        roadAddress={review.roadAddress}
                        content={review.content}
                        fileUrlList={review.fileUrlList}
                        size={review.size}
                        keywordList={review.keywordList}
                        updateAt={review.updateAt}
                        receiptCertificate={review.receiptCertificate}
                    />
                )}
            </div>
        </div>
    )
}