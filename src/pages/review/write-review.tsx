import { PageWrapper } from "../../styles/ui";
import { Block } from "../../components/block/block";
import { Help, Logowithshadow } from "../../assets/svg";
import { typo } from "../../styles/typo";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { starStyles } from "./index.styles";
import { Button } from "../../components/button/button";
import {
  Sdogwhite,
  Sdogpink,
  Mdogwhite,
  Mdogpink,
  Ldogwhite,
  Ldogpink,
} from "../../assets/svg";
import { Pinkpencil } from "../../assets/svg";
import ConfirmModal from "../../components/modal/confirm-modal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetReviewKeywords,
  usePostCreateReview,
} from "../../queries/reviews";
import { AxiosError } from "axios";
import { LoadingBar, Text } from "../../components";
import { help, labelWrapper, sizeTitle, tooltipStyle } from "./review-edit/index.styles";

export default function WriteReview() {
  const [rating, setRating] = useState(0); // 별점 상태 관리
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]); // 선택된 조건 상태 관리 (id 값 사용)
  const [selectedDogSize, setSelectedDogSize] = useState<
    "small" | "medium" | "large" | null
  >(null); // 아이 크기 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [review, setReview] = useState(""); // 리뷰 상태 관리
  const maxChars = 400; // 최대 글자 수
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // File 배열로 변경
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // 파일 미리보기 URL

  const location = useLocation(); // 전달된 state를 가져옴
  const placeId = location.state?.placeId;
  const { mutate: postCreateReview } = usePostCreateReview();
  const receiptCertificate = location.state?.receiptCertificate ?? false; // receiptCertificate 가져오기

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setReview(e.target.value); // 입력된 값이 최대 글자 수 이하인 경우 업데이트
    }
  };

  const handleConditionClick = (id: number) => {
    // 조건을 선택/해제하는 로직
    setSelectedConditions(
      (prev) =>
        prev.includes(id)
          ? prev.filter((conditionId) => conditionId !== id) // 이미 선택된 경우 제거
          : [...prev, id] // 선택되지 않은 경우 추가
    );
  };

  const { data: keywords, isLoading } = useGetReviewKeywords(placeId);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleDogSizeClick = (size: "small" | "medium" | "large") => {
    setSelectedDogSize(size);
  };

  const handleRegister = () => {
    const formData = new FormData();

    // JSON 데이터 구성
    const reviewData = {
      placeId: placeId, // 장소 ID
      receiptCertificate: receiptCertificate, // 영수증 인증 여부
      keywords: selectedConditions, // 선택된 키워드 배열
      starRate: rating, // 별점
      size: selectedDogSize?.toUpperCase(), // 선택된 크기 (SMALL, MEDIUM, LARGE 등)
      content: review, // 작성된 리뷰 내용
    };

    // JSON 데이터 문자열로 변환 후 FormData에 추가
    formData.append("request", JSON.stringify(reviewData));

    // 첨부 파일 추가
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("files", file));
    } else {
      formData.append("files", new Blob(), null); // 파일이 없을 경우 빈 파일 추가
    }

    // FormData 내용 확인 (디버깅 용도)
    console.log("FormData 내용:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // 리뷰 작성 API 호출
    postCreateReview(formData, {
      onSuccess: () => {
        setIsModalOpen(true); // 성공 시 모달 열기
      },
      onError: (error: AxiosError) => {
        if (error.response) {
          console.error("리뷰 작성 실패:", error.response.status);
          console.error("에러 메시지:", error.response.data);
        } else if (error.request) {
          console.error("요청이 서버에 도달하지 못했습니다.");
        } else {
          console.error("에러:", error.message);
        }
      },
    });
  };

  const openFileDialog = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // 강제로 input 클릭
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // 선택한 파일 가져오기
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      // 새로운 파일 및 미리보기 URL 추가
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      setFilePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => {
      // URL 해제
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // 뒤로가기 버튼 핸들러
  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <>
      <div
        css={PageWrapper}
        style={{
          height: "100vh", // 부모 요소 높이를 100vh로 고정
          overflowY: "scroll", // 스크롤 활성화
          overflowX: "hidden", // 가로 스크롤 제거
          scrollbarWidth: "none", // Firefox에서 스크롤바 숨김
          msOverflowStyle: "none", // IE/Edge에서 스크롤바 숨김
          position: "relative", // 상대 위치 지정
        }}
      >
        <style>
          {`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
          }
        `}
        </style>
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "40px",
            position: "ablsolute", // 절대 위치
            width: "100%",
            justifyContent: "center",
          })}
          style={{ marginTop: "80px" }}
        >
          <Logowithshadow css={{ width: "20%", height: "10%" }} />
          <Text type="Heading4">다녀온 곳의 리뷰를 <br/> 써보세요!</Text>
        </div>
        {/* 별점 */}
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            gap: "20px",
            position: "absolute",
            width: "100%",
          })}
          style={{ marginTop: "20px" }}
        >
          <div css={starStyles}>
            <ReactStars
              count={5} // 별의 개수
              onChange={handleStarClick} // 별 클릭 시 이벤트 핸들러
              size={50} // 별 크기
              color="#E0E0E0" // 비활성화된 별 색상
              activeColor="#F1729B" // 활성화된 별 색상
              value={rating} // 현재 선택된 값
              isHalf={false} // 반쪽 별 허용 여부
              edit={true} // 사용자 입력 허용 여부
            />
          </div>
        </div>
        {/* 다녀온 아이는 어땠나요? */}
        <div
          css={Block.flexBlock({
            direction: "column",
            gap: "20px",
            padding: "30px",
          })}
        >
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
          <div
            css={Block.flexBlock({
              
              direction: "row",
              justifyContent: "space-between",
              gap: "20px",
              width: "100%",
            })}
          >
            {/* 소형 아이 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "16px",
              })}
              onClick={() => handleDogSizeClick("small")}
            >
              {selectedDogSize === "small" ? (
                <Sdogpink width={80} />
              ) : (
                <Sdogwhite width={80}/>
              )}
              <span
                css={typo.Body2}
                style={{
                  color: selectedDogSize === "small" ? "#000000" : "#8E8E93",
                  cursor: "pointer",
                }}
              >
                소형
              </span>
            </div>

            {/* 중형 아이 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
              })}
              onClick={() => handleDogSizeClick("medium")}
            >
              {selectedDogSize === "medium" ? (
                <Mdogpink width={80}/>
              ) : (
                <Mdogwhite width={80}/>
              )}
              <span
                css={typo.Body2}
                style={{
                  color: selectedDogSize === "medium" ? "#000000" : "#8E8E93",
                  cursor: "pointer",
                }}
              >
                중형
              </span>
            </div>

            {/* 대형 아이 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
              })}
              onClick={() => handleDogSizeClick("large")}
            >
              {selectedDogSize === "large" ? (
                <Ldogpink width={80} />
              ) : (
                <Ldogwhite width={80} />
              )}
              <span
                css={typo.Body2}
                style={{
                  color: selectedDogSize === "large" ? "#000000" : "#8E8E93",
                  cursor: "pointer",
                }}
              >
                대형
              </span>
            </div>
          </div>
        </div>
        {/* 입장조건이 무엇인가요? */}
        <div
          css={Block.flexBlock({
            direction: "column",
            gap: "20px",
            padding: "30px",
          })}
        >
          <span css={typo.Heading4}>어떤 점이 좋았나요?</span>
          <div
            css={labelWrapper}
          >
            {/* 키워드 로딩 중인 경우 */}
            {isLoading &&  (<LoadingBar/>)}

            {/* 키워드 렌더링 */}
            {!isLoading &&
              keywords &&
              keywords.map(({ id, content }) => (
                <button
                  key={id}
                  css={
                    selectedConditions.includes(id)
                      ? Button.mainPinkButton({
                          isDisabled: false,
                          width: "260px",
                          height: "50px",
                        })
                      : Button.grayBorderButton({
                          width: "260px",
                          height: "50px",
                        })
                  }
                  onClick={() => handleConditionClick(id)}
                >
                  {content}
                </button>
              ))}
          </div>
          {/* 사진/영상을 추가해 주세요 */}
          <div
            css={Block.flexBlock({
              direction: "column",
              border: "1px solid #BBBBBB",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              gap: "20px",
              width: "100%",
              borderRadius: "20px",
            })}
            style={{
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <span css={typo.Heading3}>사진/영상을 추가해 주세요</span>

            {/* 이미지/동영상 업로드 영역 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  selectedFiles.length === 0 ? "center" : "flex-start",
                overflowX: "scroll", // 가로 스크롤 활성화
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                gap: "10px",
                whiteSpace: "nowrap",
                position: "relative",
              }}
            >
              {filePreviews.map((url, index) => (
                <div
                  key={index}
                  style={{
                    flex: "0 0 auto",
                    width: "100px",
                    height: "100px",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  {selectedFiles[index].type.startsWith("video/") ? (
                    <video
                      src={url}
                      controls
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    ></video>
                  ) : (
                    <img
                      src={url}
                      alt="uploaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleFileRemove(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "#F1729B",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* + 버튼 */}
              <button
                css={Button.mainPinkButton({
                  width: "40px",
                  height: "40px",
                  isDisabled: false,
                })}
                style={{
                  flex: "0 0 auto", // 이미지와 버튼 고정 너비
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={openFileDialog}
              >
                <span style={{ fontSize: "30px", marginTop: "-5px" }}>+</span>
              </button>
              <input
                type="file"
                accept="image/*,video/*" // 이미지와 동영상 허용
                id="file-input"
                multiple // 여러 파일 선택 허용
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div
            css={Block.flexBlock({
              direction: "column",
              border: "1px solid #BBBBBB",
              alignItems: "center",
              padding: "20px",
              gap: "20px",
              width: "100%",
              borderRadius: "20px",
            })}
            style={{ marginTop: "30px", flexWrap: "wrap" }}
          >
            <div
              css={Block.flexBlock({
                direction: "row",
                alignItems: "center",
                gap: "5px",
              })}
            >
              <Pinkpencil css={{ width: "24px", height: "24px" }} />
              <span css={typo.Body2} style={{ color: "#888888" }}>
                리뷰를 작성해 주세요
              </span>
            </div>
            <textarea
              value={review}
              onChange={handleReviewChange}
              style={{
                width: "100%",
                height: "170px",
                resize: "none",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "14px",
                marginTop: "-10px",
              }}
              placeholder="리뷰 작성 시 욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
            />
            <span
              style={{
                // textAlign: "end",
                fontSize: "12px",
                color: review.length > maxChars ? "red" : "#9A9EA6",
                marginLeft: "80%",
              }}
            >
              {review.length} / {maxChars}
            </span>
          </div>
          <div
            css={Block.flexBlock({
              direction: "row",
              gap: "12px",
            })}
          >
            <button
              css={Button.mainWhiteButton({
                width: "40%",
                height: "50px",
              })}
              onClick={handleBackButtonClick}
            >
              취소
            </button>
            <button
              css={Button.mainPinkButton({
                isDisabled: !rating || !selectedDogSize, // rating과 selectedDogSize가 없을 경우 비활성화
                width: "60%",
                height: "50px",
              })}
              disabled={!rating || !selectedDogSize} // rating과 selectedDogSize가 없을 경우 비활성화
              onClick={handleRegister} // 등록하기 클릭 시 모달 열기
              style={{
                backgroundColor:
                  rating && selectedDogSize ? "#F1729B" : "#E0E0E0", // 활성화/비활성화에 따른 색상 변경
                cursor: rating && selectedDogSize ? "pointer" : "not-allowed", // 활성화/비활성화에 따른 커서 변경
              }}
            >
              등록하기
            </button>
          </div>
          {/* 모달 */}
          <ConfirmModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title="리뷰가 등록되었어요!"
            subText="마이페이지 > 내 리뷰 조회에서 확인해보세요"
            confirmText="확인"
            onConfirm={() => setIsModalOpen(false)} // 모달 닫기 동작
            placeId={placeId} // placeId 추가
          />
        </div>
      </div>
    </>
  );
}
