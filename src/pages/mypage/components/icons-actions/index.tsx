import { DeleteIcon, ReviewModifyIcon } from "../../../../assets/svg";
import { icon, wrapper } from "./index.styles";

interface Props {
    onModifyButtonClick?: () => void;
    onDeleteButtonClick?: () => void;
}

export default function IconsActions({onModifyButtonClick, onDeleteButtonClick} : Props ){
    return (
        <div css={wrapper}>
            {location.pathname === '/mypage/review-list' &&
                <ReviewModifyIcon width={24} css={icon} onClick={onModifyButtonClick}/>
            }
                <DeleteIcon width={24} css={icon} onClick={onDeleteButtonClick}/>
        </div>
    )
}