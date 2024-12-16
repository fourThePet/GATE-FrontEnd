import { ChangeEvent,  useEffect,  useRef,  useState } from "react";
import { CertificateLabel, GrayBorderButton, LoadingBar, MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { addIcon, borderWrapper, bottomButtonStyle, charsCount, contentWrapper, deleteIcon, fileInput, fileSize, fileWrapper, formTitleWrapper, help, iconWrapper, imageWrapper, labelWrapper, mainWrapper, reviewTitle, sizeTitle, sizeWrapper, starStyles, textArea, titleWrapper, tooltipStyle, wrapper } from "./index.styles";
import ReactStars from "react-rating-stars-component"
import { AddIcon, FileDelete, Help, Ldogpink, Ldogwhite, Mdogpink, Mdogwhite, Pinkpencil, Sdogpink, Sdogwhite } from "../../../assets/svg";
import ConditionLabel from "../../../components/label/condition-label";
import { useLocation, useNavigate} from "react-router-dom";
import { useGetReviewKeywords, useGetReviewsReviewId, usePutReviewByReviewId } from "../../../queries";
import { notify } from "../../../utils/constants";
import { convertImageUrlToFile } from "../../../utils/convertImageUrlToFile";
import usePageMeta from "../../../utils/usePageMeta";
interface FileWithPreview {
    file?: File;
    url: string;
    type: string; // "image" or "video"
  }

export default function ReviewEdit(){
    usePageMeta("GATE | 리뷰수정", 'GATE 리뷰수정'); //seo 검색 최적화
    const navigate = useNavigate()
    const location = useLocation(); // navigate로 전달된 state를 가져옴
    const id = location.state; 
    const { data : reviewData, isLoading : isReviewLoading } = useGetReviewsReviewId(id)
    
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]); // File 배열로 변경
    const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
    const maxChars = 400; //최대 글자수 
    const [selectedDogSize, setSelectedDogSize] = useState<"SMALL" | "MEDIUM" | "LARGE" | null>(null); 
    
    const { mutate : modifyReview } = usePutReviewByReviewId(id)
    // reviewData를 기반으로 초기 상태 설정
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
            setSelectedFiles(processedFileList) //파일
            setReviewText(reviewData?.content) //리뷰 내용
            setRating(reviewData?.starRate) //별점
            setSelectedDogSize(reviewData?.size); // 반려견 크기
            
        }
    }, [reviewData]);

    // placeId 기반으로 키워드 데이터 가져오기
    const placeId = reviewData?.placeId;
    const { data: keywordsData, isLoading:isKeywordsLoading} = useGetReviewKeywords(placeId); 

    const [enrichedKeywords, setEnrichedKeywords] = useState([]);

    useEffect(() => { //키워드 
        if (keywordsData && reviewData?.keywordList) {
            const enriched = keywordsData.map((keyword) => ({
                id: keyword.id,
                content: keyword.content,
                selected: reviewData.keywordList.includes(keyword.content),
            }));

            setEnrichedKeywords(enriched);
            setSelectedKeywords(
                enriched.filter((keyword) => keyword.selected).map((keyword) => keyword.id)
            );
        }
    }, [keywordsData, reviewData]);

    //별점
    const handleStarClick = (newRating : number) => {
        setRating(newRating);
    };

    //견종 크기
    const handleSizeClick = (size:"SMALL" | "MEDIUM" | "LARGE" ) => {
        setSelectedDogSize(size);
        
    };

    //리뷰 작성 변경 이벤트
    const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        // 400자 초과 여부 검사
        if (value.length <= 400) {
            setReviewText(value); // 유효한 경우만 상태 업데이트
        } else {
            // 유효하지 않을 경우 알림 메시지 처리
            notify({
                type: "warning",
                text: "리뷰는 400자 이내로 작성해주세요.",
            });
        }
    }

    //파일 변경 이벤트
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

    //파일 삭제 이벤트
    const handleFileRemove = (index: number) => {
        setSelectedFiles((prev) => {
          URL.revokeObjectURL(prev[index].url); // URL 해제
          return prev.filter((_, i) => i !== index);
        });
    };

    //수정하기 버튼 이벤트
    const handleModifyButtonClick = async () =>{
        const formData = new FormData();
        const request = {
            placeId,
            receiptCertificate : reviewData?.receiptCertificate,
            starRate : rating,
            content: reviewText,
            size : selectedDogSize,
            keywords : selectedKeywords,
        }
        formData.append("request", JSON.stringify(request));
        
        // 기존 선택된 파일 추가
        for (const fileWithPreview of selectedFiles) {
            
            if (fileWithPreview.file) {
                // 파일 객체가 존재하면 그대로 추가
                formData.append("files", fileWithPreview.file);
            } else {
                // URL만 있는 경우 URL을 파일로 변환 후 추가
                
                const file = await convertImageUrlToFile(fileWithPreview.url, `${fileWithPreview.url}`);
                formData.append("files", file);
            }
        }

        modifyReview(formData, {
            onSuccess : () => {
                navigate(-1)
                notify({
                    type : "success",
                    text : "리뷰가 수정되었어요"
                })
                
            },
            onError : () => {
                notify({
                    type : "error",
                    text : "리뷰 수정 중 문제가 발생했습니다. 다시 시도해주세요"
                })
                
            },
        })
    }

    
    
    if(isKeywordsLoading || isReviewLoading){ return (<LoadingBar/>)}
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
                        key={rating}
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
                    <div css={sizeTitle}>
                        <Text type="Heading4">다녀온 아이는 어땠나요?</Text>
                        <div css={help} className="button-wrapper">
                            <Help width={16} />
                            <span css={tooltipStyle} className="tooltip">
                            {`소형 : 10kg 이하 
                                중형 : 10kg 초과 25kg 이하
                                대형 : 25kg 초과
                                `}
                            </span>
                        </div>

                    </div>
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
                    <Text type="Heading4">어떤 점이 좋았나요?</Text>
                    <div css={labelWrapper}>
                        {enrichedKeywords?.map((keyword, index)=>{
                            return (
                                <ConditionLabel
                                    key={index}
                                    initialSelected={keyword.selected}
                                    onToggle={(isSelected) => {
                                        if (isSelected) {
                                          // 선택된 경우 추가
                                          setSelectedKeywords((prev) => [...prev, keyword.id]);
                                        } else {
                                          // 선택 해제된 경우 제거
                                          setSelectedKeywords((prev) => prev.filter((k) => k !== keyword.id));
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
                            ref={fileInputRef}
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
                        <Text type="Label4" color={reviewText.length === maxChars ? "red" : colors.color.Gray1}>{reviewText.length}/{maxChars}</Text>
                    </div>
                </div>
                <div css={bottomButtonStyle}>
                    <GrayBorderButton width="40%" title="취소" onClick={()=>navigate(-1)}/>
                    <MainPinkButton width="60%" onClick={handleModifyButtonClick} >수정하기</MainPinkButton>
                </div>
            </div>
        </div>
    )
}