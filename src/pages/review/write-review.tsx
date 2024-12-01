import { PageWrapper } from "../../styles/ui";
import { Block } from "../../components/block/block";
import { Logowithshadow } from "../../assets/svg";
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
import { useNavigate } from "react-router-dom";
export default function WriteReview() {
  const [rating, setRating] = useState(0); // 별점 상태 관리
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]); // 선택된 조건 상태 관리
  const [selectedDogSize, setSelectedDogSize] = useState<
    "small" | "medium" | "large" | null
  >(null); // 아이 크기 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [review, setReview] = useState(""); // 리뷰 상태 관리
  const maxChars = 400; // 최대 글자 수
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<
    { url: string; type: "image" | "video" }[]
  >([]); // 파일 URL과 타입 관리

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setReview(e.target.value); // 입력된 값이 최대 글자 수 이하인 경우 업데이트
    }
  };

  const handleConditionClick = (condition: string) => {
    // 조건을 선택/해제하는 로직
    setSelectedConditions(
      (prev) =>
        prev.includes(condition)
          ? prev.filter((c) => c !== condition) // 이미 선택된 경우 제거
          : [...prev, condition] // 선택되지 않은 경우 추가
    );
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleDogSizeClick = (size: "small" | "medium" | "large") => {
    setSelectedDogSize(size);
  };

  const handleRegister = () => {
    setIsModalOpen(true); // 모달 열기
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
      const newFiles = Array.from(files)
        .map((file) => {
          const fileType = file.type.includes("image")
            ? "image"
            : file.type.includes("video")
            ? "video"
            : null;

          if (!fileType) return null;

          return {
            url: URL.createObjectURL(file),
            type: fileType as "image" | "video", // 타입을 명시적으로 설정
          };
        })
        .filter(
          (file): file is { url: string; type: "image" | "video" } =>
            file !== null
        ); // null 값 필터링

      setSelectedFiles((prev) => [...prev, ...newFiles]); // 상태 업데이트
    }
  };

  const handleFileRemove = (fileUrl: string) => {
    // 파일 삭제
    setSelectedFiles((prev) => prev.filter((file) => file.url !== fileUrl));
    URL.revokeObjectURL(fileUrl); // URL 해제
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
          style={{ marginTop: "100px" }}
        >
          <Logowithshadow css={{ width: "20%", height: "10%" }} />
          <span css={typo.Heading1} style={{ fontSize: "100%" }}>
            다녀온 곳의 리뷰를
            <br /> 써보세요 !
          </span>
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
          {/* <span css={typo.Body1}>{rating}점</span> */}
        </div>
        {/* 다녀온 아이는 어땠나요? */}
        <div
          css={Block.flexBlock({
            direction: "column",
            gap: "20px",
            margin: "25px",
          })}
        >
          <span css={typo.Heading4}>다녀온 아이는 어땠나요?</span>
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "space-between",
              gap: "20px",
              width: "60%",
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
                <Sdogpink css={{ width: "90px", height: "90px" }} />
              ) : (
                <Sdogwhite css={{ width: "90px", height: "90px" }} />
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
                <Mdogpink css={{ width: "90px", height: "90px" }} />
              ) : (
                <Mdogwhite css={{ width: "90px", height: "90px" }} />
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
                <Ldogpink css={{ width: "90px", height: "90px" }} />
              ) : (
                <Ldogwhite css={{ width: "90px", height: "90px" }} />
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
            margin: "10% 4%",
          })}
        >
          <span css={typo.Heading4}>입장조건이 무엇인가요? </span>
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "space-between",
              gap: "20px",
              width: "90%",
            })}
            style={{
              flexWrap: "wrap", //크기 맞춤
            }}
          >
            {[
              "입마개는 필수예요 🐾",
              "케이지를 사용했어요 🙏",
              "기저귀를 착용해요 ☁️",
              "리드줄을 착용했어요 〰️",
              "실내 동반이 가능해요 🛋️",
              "테라스 이용만 가능해요 🏕️",
            ].map((condition, index) => (
              <button
                key={index}
                css={
                  selectedConditions.includes(condition)
                    ? Button.mainPinkButton({
                        isDisabled: false, // 추가
                        width: "260px",
                        height: "50px",
                      })
                    : Button.grayBorderButton({
                        width: "260px",
                        height: "50px",
                      })
                }
                onClick={() => handleConditionClick(condition)}
              >
                {condition}
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
              width: "92%",
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
              {selectedFiles.map((file, index) => (
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
                  {file.type === "video" ? (
                    <video
                      src={file.url}
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
                      src={file.url}
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
                    onClick={() => handleFileRemove(file.url)}
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
              width: "92%",
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
                width: "45%",
                height: "50px",
              })}
              onClick={handleBackButtonClick}
            >
              취소
            </button>
            <button
              css={Button.mainPinkButton({
                isDisabled: !rating && !selectedDogSize,
                width: "45%",
                height: "50px",
              })}
              disabled={!rating}
              onClick={handleRegister} // 등록하기 클릭 시 모달 열기
              // disabled={!setSelectedDogSize}
              style={{
                backgroundColor: rating ? "#F1729B" : "#E0E0E0", // 선택 시 활성화 색상
                cursor: rating ? "pointer" : "not-allowed", // 비활성화 시 커서 변경
                // marginTop: "20px",
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
          />
        </div>
      </div>
    </>
  );
}
