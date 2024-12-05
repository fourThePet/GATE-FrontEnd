import { ChangeEvent,  useEffect,  useState } from "react";
import { CertificateLabel, GrayBorderButton, MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { addIcon, borderWrapper, bottomButtonStyle, charsCount, contentWrapper, deleteIcon, fileInput, fileSize, fileWrapper, formTitleWrapper, iconWrapper, imageWrapper, labelWrapper, mainWrapper, reviewTitle, sizeWrapper, starStyles, textArea, titleWrapper, wrapper } from "./index.styles";
import ReactStars from "react-rating-stars-component"
import { AddIcon, FileDelete, Ldogpink, Ldogwhite, Mdogpink, Mdogwhite, Pinkpencil, Sdogpink, Sdogwhite } from "../../../assets/svg";
import ConditionLabel from "../../../components/label/condition-label";
import { useLocation, useNavigate} from "react-router-dom";
import { useGetReviewKeywords, useGetReviewsReviewId } from "../../../queries";
interface FileWithPreview {
    file?: File;
    url: string;
    type: string; // "image" or "video"
  }

export default function ReviewEdit(){
    const navigate = useNavigate()
    const location = useLocation(); // navigate로 전달된 state를 가져옴
    const id = location.state; 
    const { data : reviewData } = useGetReviewsReviewId(id)
    
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");
    
    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]); // File 배열로 변경
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const maxChars = 400; //최대 글자수 
    const [selectedDogSize, setSelectedDogSize] = useState<"SMALL" | "MEDIUM" | "LARGE" | null>(); 
    const handleStarClick = (newRating : number) => {
        setRating(newRating);
    };
    
    // reviewData.size를 기반으로 초기 상태 설정
    useEffect(() => {
        if (reviewData) {
            const processedFileList = Array.isArray(reviewData?.fileUrlList)
            ? reviewData.fileUrlList.map((url : string) => {
                if (!url || typeof url !== "string") return null; // 유효성 검사
                const isImage = url.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i);
                return {
                    url,
                    type: isImage ? "image" : "video",
                };
                }).filter((item) => item !== null) // null 값 제거
            : [];
            setSelectedFiles(processedFileList)
            setReviewText(reviewData?.content)
            setRating(reviewData?.starRate)
            setSelectedDogSize(reviewData?.size); // 초기값 설정
            
        }
    }, [reviewData]);

    // placeId 기반으로 키워드 데이터 가져오기
    const placeId = reviewData?.placeId;
    const { data: keywordsData} = useGetReviewKeywords(placeId);
    
    
    // console.log(reviewData, keywordsData)
    

    //견종 크기
    const handleSizeClick = (size:"SMALL" | "MEDIUM" | "LARGE" ) => {
        setSelectedDogSize(size);
        
    };

    const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        setReviewText(value)
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          const newFiles = Array.from(files).map((file) => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith("image/") ? "image" : "video",
          }));
      
          setSelectedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleFileRemove = (index: number) => {
        setSelectedFiles((prev) => {
          URL.revokeObjectURL(prev[index].url); // URL 해제
          return prev.filter((_, i) => i !== index);
        });
    };

    const handleModifyButtonClick = () =>{
        const formData = new FormData();
        const request = {
            placeId,
            receiptCertificate : reviewData?.receiptCertificate,
            starRate : rating,
            content: reviewText,
            size : selectedDogSize,
            keywords : selectedKeywords,
        }
        formData.append("request",JSON.stringify(request));
        // 선택된 파일 추가
        selectedFiles.forEach((fileWithPreview) => {
            if (fileWithPreview.file) {
                formData.append("files", fileWithPreview.file); // 서버가 기대하는 필드 이름으로 추가
            }
        });
        //console.log(placeId,selectedKeywords, selectedDogSize, rating, reviewText, selectedFiles, )
        // FormData 내용 출력
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    }

    // 이미지 URL을 파일로 변환하는 함수
    const convertImageUrlToFile = async (url, fileName) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };
    
    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={mainWrapper}>
                    <div css={titleWrapper}>
                        <Text type="Heading2">{reviewData?.placeName}</Text>
                        <Text type="Body3" color={colors.color.Gray1}>{reviewData?.roadAddress}</Text>
                    </div>
                    { reviewData?.receiptCertificate && <CertificateLabel/> }
                </div>
                <div css={starStyles}>
                    <ReactStars
                        count={5}
                        size={50}
                        color={colors.color.Gray4}
                        activeColor={colors.color.MainColor}
                        value={rating}
                        onChange={handleStarClick}
                        isHalf={false}
                        edit={true}
                    />
                </div>
                <div css={formTitleWrapper}>
                    <Text type="Heading4">다녀온 아이는 어땠나요?</Text>
                    <div css={sizeWrapper}>
                        {/* 소형 */}
                        <div css={iconWrapper} onClick={()=> handleSizeClick("SMALL")}>
                            {selectedDogSize === "SMALL" ? <Sdogpink width={80} /> : <Sdogwhite width={80} />}
                            <Text type="Body2" color={selectedDogSize === "SMALL" ? colors.color.Black : colors.color.Gray2}>
                            소형
                            </Text>
                        </div>
                        {/* 중형 */}
                        <div css={iconWrapper} onClick={()=> handleSizeClick("MEDIUM")}>
                            {selectedDogSize === "MEDIUM" ? <Mdogpink width={80} /> : <Mdogwhite width={80} />}
                            <Text type="Body2" color={selectedDogSize === "MEDIUM" ? colors.color.Black : colors.color.Gray2}>
                            중형
                            </Text>
                        </div>
                        {/* 대형 */}
                        <div css={iconWrapper} onClick={()=> handleSizeClick("LARGE")}>
                            {selectedDogSize === "LARGE" ? <Ldogpink width={80} /> : <Ldogwhite width={80} />}
                            <Text type="Body2" color={selectedDogSize === "LARGE" ? colors.color.Black : colors.color.Gray2}>
                            대형
                            </Text>
                        </div>
                    </div>
                </div>
                <div css={formTitleWrapper}>
                    <Text type="Heading4">입장조건이 무엇인가요?</Text>
                    <div css={labelWrapper}>
                        {keywordsData?.map((keyword, index)=>{
                            
                            const isChecked = reviewData?.keywordList?.includes(keyword.content);
                            // console.log(keyword.id,reviewData?.keywordList, isChecked)
                            return (
                                <ConditionLabel
                                    key={index}
                                    initialSelected={isChecked}
                                    onToggle={(isSelected) => {
                                        if (isSelected) {
                                          // 선택된 경우 추가
                                          setSelectedKeywords((prev) => [...prev, keyword.content]);
                                        } else {
                                          // 선택 해제된 경우 제거
                                          setSelectedKeywords((prev) => prev.filter((k) => k !== keyword.content));
                                        }
                                    }}
                                >{keyword.content}</ConditionLabel>
                            )
                        })}
                    </div>
                </div>
                <div css={imageWrapper((selectedFiles.length === 0))}>
                    {selectedFiles?.map(({ url, type }, index) => (
                        <div css={fileWrapper} key={index}>
                            {type === "image" ? (
                                <img src={url} css={fileSize}/>
                            ) : (
                                <video src={url} css={fileSize} controls />
                            )}
                            <FileDelete
                                width={24}
                                css={deleteIcon}
                                onClick={() => handleFileRemove(index)}
                            />
                        </div>
                    ))}
                    <label css={addIcon}>
                        <AddIcon width={48}/>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            css={fileInput}
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div css={borderWrapper}>
                    <div css={reviewTitle}>
                        <Pinkpencil width={16}/>
                        <Text type="Body2" color={colors.color.Gray0}>리뷰를 작성해 주세요</Text>
                    </div>
                    <textarea css={textArea}
                        value={reviewText}
                        onChange={handleReviewChange}
                        placeholder="리뷰 작성 시 욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."/>
                    <div css={charsCount}>
                        <Text type="Label4" color={reviewText.length > maxChars ? "red" : colors.color.Gray1}>{reviewText.length}/{maxChars}</Text>
                    </div>
                </div>
                <div css={bottomButtonStyle}>
                    <GrayBorderButton width="40%" title="취소" onClick={()=>navigate(-1)}/>
                    <MainPinkButton width="60%" title="수정하기" onClick={handleModifyButtonClick} />
                </div>
            </div>
        </div>
    )
}