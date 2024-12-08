import { useState } from "react";
import { Ldogpink, Mdogpink, MenuIcon, Sdogpink } from "../../../../assets/svg";
import { Text, FilterLabel, CertificateLabel } from "../../../../components";
import colors from "../../../../styles/colors";
import { cardWrapper, dateWrapper, imageStyle, imageWrapper, labelWrapper, line, menuWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";
import IconsActions from "../icons-actions";
import { ReviewDataType } from "../../../../interfaces";
import { useDeleteReviews } from "../../../../queries";
import { useNavigate } from "react-router-dom";

export default function ReviewList({id, placeName, roadAddress, content, fileUrlList, keywordList, size, updateAt, receiptCertificate} : ReviewDataType){
    const {mutate : deleteReview} = useDeleteReviews();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const navigate = useNavigate();
    const toggleText = () => {
        setIsExpanded((prev) => !prev);
    };

    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
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
    
    const handleDeleteClick = () =>{
        if(id){
            deleteReview(id)
        }
    }

    const handleModifyClick = () =>{
        navigate(`/review/edit/${id}`, {state:id})
    }

    return(
        <div css={wrapper}>
            <div css={dateWrapper}>
                <Text type="Body2" color={colors.color.Gray1}>{updateAt.split("T")[0]}</Text>
            </div>
            <div css={cardWrapper}>
                <div css={titleWrapper}>
                    <Text type="Body2">{placeName}</Text>
                    <Text type="Label3" color={colors.color.Gray1}>{roadAddress}</Text>
                    {receiptCertificate == true && <CertificateLabel/>}
                    <div css={menuWrapper}>
                        <MenuIcon width={16} onClick={handleMenuIconClick}/>
                        {isIconVisible && (<IconsActions onDeleteButtonClick={handleDeleteClick} onModifyButtonClick={handleModifyClick}/>) }
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
                        <FilterLabel key={keyword}>{keyword}</FilterLabel>
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