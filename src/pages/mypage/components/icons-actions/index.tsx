import { DeleteIcon, ReviewModifyIcon } from "../../../../assets/svg";
import { icon, wrapper } from "./index.styles";

export default function IconsActions(){
    return (
        <div css={wrapper}>
            {location.pathname === '/mypage/review-list' &&
                <ReviewModifyIcon width={24} css={icon}/>
            }
                <DeleteIcon width={24} css={icon}/>
        </div>
    )
}