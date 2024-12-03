import { ReviewList } from "../components";
import { contentWrapper, wrapper } from './index.styles';

export default function MyReview(){
    return (
        <div css={contentWrapper}>
            <div css={wrapper}>
                <ReviewList/>
            </div>
        </div>
    )
}