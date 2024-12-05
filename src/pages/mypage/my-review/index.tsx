import { useEffect, useState } from "react";
import { Text } from "../../../components";
import { ReviewDataType } from "../../../interfaces";
import { useGetReviewsMy } from "../../../queries";
import colors from "../../../styles/colors";
import { ReviewList } from "../components";
import { contentWrapper, countWrapper, wrapper } from './index.styles';

export default function MyReview(){
    const {data : reviewList} = useGetReviewsMy()
    const [count, setCount] = useState<number>(0)
    
    useEffect(()=>{
        if(reviewList?.length>0)
        setCount(reviewList.length)
    },[reviewList])
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
                        content={review.content}
                        fileUrlList={review.fileUrlList}
                        size={review.size}
                        keywordList={review.keywordList}
                        updateAt={review.updateAt}
                    />
                )}
            </div>
        </div>
    )
}