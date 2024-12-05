import { useState } from "react";
import { MenuIcon, Sdogpink } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { cardWrapper, dateWrapper, imageStyle, imageWrapper, labelWrapper, line, menuWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";
import FilterLabel from "../../../../components/label";
import IconsActions from "../icons-actions";

export default function ReviewList(){
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleText = () => {
        setIsExpanded((prev) => !prev);
    };

    const [isIconVisible, setIsIconVisible] = useState<boolean>(false)
    const handleMenuIconClick = () => {
        setIsIconVisible((prev)=> !prev)
    }
    
    const fullText = `다른 어떤 애견동반 카페보다 좋았어요!! 친절하신 사장님 진짜 너무
                감동이었구요 ㅠㅠㅠ! 우리 멍멍이 한마리가 너무 예민해서 강아지
                운동장을 못 가는데 여기는 그런 아이 케어까지 완벽하게 해주셔서
                너무 좋았습니다! 다음에도 꼭 방문할 예정이에요.`

    // 100자만 자른 텍스트 생성
    const previewText = `${fullText.slice(0, 100)}${fullText.length > 100 ? "..." : ""}`;

    return(
        <div css={wrapper}>
            <div css={dateWrapper}>
                <Text type="Body2" color={colors.color.Gray1}>{'2024-11-11'}</Text>
            </div>
            <div css={cardWrapper}>
                <div css={titleWrapper}>
                    <Text type="Body2">{'더왈츠 애견카페'}</Text>
                    <Text type="Label3" color={colors.color.Gray1}>{'서울특별시 강남구 역삼로 134'}</Text>
                    <div css={menuWrapper}>
                        <MenuIcon width={16} onClick={handleMenuIconClick}/>
                        {isIconVisible && (<IconsActions/>) }
                    </div>
                </div>
                <hr css={line} color={colors.color.Gray3}/>
                <div css={textWrapper}>
                    <Text type="Label21">{isExpanded ? fullText : previewText}</Text>
                    <Text type="Label2" color={colors.color.MainColor} onClick={toggleText}>{isExpanded ? '접기' : '더보기'}</Text>
                </div>
                <div css={labelWrapper}>
                    <Sdogpink width={40}/>
                    <FilterLabel>입마개는 필수에요 🐾</FilterLabel>
                    <FilterLabel>기저귀를 착용해요 ☁️</FilterLabel>
                </div>
                <div css={imageWrapper}>
                    <img src="/images/review_ex.png" css={imageStyle}/>
                </div>
            </div>
        </div>
    )
}