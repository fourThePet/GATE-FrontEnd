import { useState } from "react";
import { Ldogpink, Mdogpink, MenuIcon, Sdogpink } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { cardWrapper, dateWrapper, imageStyle, imageWrapper, labelWrapper, line, menuWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";
import FilterLabel from "../../../../components/label";
import IconsActions from "../icons-actions";
import { ReviewDataType } from "../../../../interfaces";

export default function ReviewList({id, content, fileUrlList, keywordList, size, updateAt} : ReviewDataType){
    console.log(id)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const toggleText = () => {
        setIsExpanded((prev) => !prev);
    };

    const [isIconVisible, setIsIconVisible] = useState<boolean>(false)
    const handleMenuIconClick = () => {
        setIsIconVisible((prev)=> !prev)
    }
    
    const components = {
        SMALL: <Sdogpink width={40} />,
        MEDIUM: <Mdogpink width={40} />,
        LARGE: <Ldogpink width={40} />,
    };
      
    // 100자만 자른 텍스트 생성
    const previewText = `${content.slice(0, 100)}${content.length > 100 ? "..." : ""}`;
    
    
    return(
        <div css={wrapper}>
            <div css={dateWrapper}>
                <Text type="Body2" color={colors.color.Gray1}>{updateAt.split("T")[0]}</Text>
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
                    <Text type="Label21">{isExpanded ? content : previewText}</Text>
                    {content.length>100 && //100글자 이상일 때만 더보기,접기 보임
                        <Text type="Label2" color={colors.color.MainColor} onClick={toggleText}>{isExpanded ? '접기' : '더보기'}</Text>
                    }
                </div>
                <div css={labelWrapper}>
                    {components[size] || null}
                    {keywordList?.map((keyword)=>
                        <FilterLabel>{keyword}</FilterLabel>
                    )}
                    
                </div>
                <div css={imageWrapper}>
                    {fileUrlList?.map((file)=>
                        <img key={file} src={file} css={imageStyle}/>
                    )}
                </div>
            </div>
        </div>
    )
}