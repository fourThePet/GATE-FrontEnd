import React, { useState } from "react";
import ReactModal from "react-modal";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import Realreceipt from "../../assets/svg/Realreceipt";
import { useNavigate } from "react-router-dom";
import NoBorderGrayButton from "../button/no-border-gray";
type ReceiptSubmitProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
import { requestOCR } from "../../api/ocr"; // OCR 요청 함수 임포트
import { OCRField } from "../../interfaces/ocr";
export default function ReceiptSubmit({
  isOpen,
  setIsOpen,
}: ReceiptSubmitProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 선택된 이미지 상태 관리

  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate(); // navigate 인스턴스 생성
  const [ocrState, setOcrState] = useState({
    isPending: false,
    error: null,
    success: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        window.alert("JPG 또는 PNG 이미지만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleWriteReviewButtonClick = async () => {
    if (!selectedImage) {
      window.alert("이미지를 업로드해주세요.");
      return;
    }

    setOcrState({ isPending: true, error: null, success: false });

    try {
      const file = await fetch(selectedImage).then((res) => res.blob());
      const ocrResponse = await requestOCR([file as File]);

      const fields: OCRField[] = ocrResponse?.images?.[0]?.fields || [];
      console.log("fields 데이터:", fields);

      // isReceipt 변수 정의: OCR 필드에서 영수증 여부 확인
      const isReceipt = fields.some((field) => {
        const inferText = field.inferText || ""; // 필드 내 텍스트
        return (
          inferText.includes("영수증") ||
          inferText.includes("금액") ||
          inferText.includes("합계") ||
          inferText.includes("판매일자") ||
          inferText.includes("카드금액")
        );
      });

      if (isReceipt) {
        setOcrState({ isPending: false, error: null, success: true });
        window.alert("영수증 확인 성공!");
        navigate("/review/writereview");
      } else {
        setOcrState({
          isPending: false,
          error: "영수증 판별 실패",
          success: false,
        });
        window.alert("업로드한 이미지는 영수증이 아닙니다.");
      }
    } catch (error) {
      console.error("OCR 분석 실패:", error);
      setOcrState({ isPending: false, error: "OCR 요청 실패", success: false });
      window.alert("OCR 분석 중 문제가 발생했습니다.");
    }
  };
  const openFileDialog = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // 강제로 input 클릭
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Receipt Submit Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
          display: "flex",
          justifyContent: "center", // 가로 정렬
          alignItems: "center", // 세로 정렬
          zIndex: 1000,
        },
        content: {
          position: "absolute", // 절대 위치
          width: "400px",
          height: "600px",
          top: "50%", // 세로 정가운데
          left: "50%", // 가로 정가운데
          transform: "translate(-50%, -50%)", // 위치를 중앙으로 보정
          padding: "20px",
          borderRadius: "16px",
          backgroundColor: "#fff",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
          border: "none",
          overflow: "hidden",
        },
      }}
    >
      {/* 모달 닫기 버튼 */}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          border: "none",
          background: "none",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={closeModal}
      >
        ×
      </button>

      {/* 모달 내용 */}
      <div
        css={Block.flexBlock({
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        })}
      >
        {/* 제목 */}
        <span css={typo.Heading2}>영수증 제출 하기</span>

        {/* 부가 텍스트 */}
        <span
          css={typo.Body3}
          style={{
            textAlign: "center",
            color: "#9A9EA6",
            marginTop: "-10px",
          }}
        >
          전화번호, 사업자 번호, 주소가 <br /> 잘 나온 사진을 넣어주세요!
        </span>
        {/* 파일 선택 Input (숨김) */}
        <input
          type="file"
          accept="image/*"
          id="file-input"
          onChange={handleFileChange} // 파일 선택 핸들러
          style={{ display: "none" }} // 숨김 처리
        />

        {/* 첨부하기 버튼 */}
        <NoBorderGrayButton
          isDisabled={false}
          onClick={openFileDialog}
          width="80px"
          height="40px"
          title="첨부하기"
        />

        {/* 영수증 이미지 */}
        <div
          style={{
            width: "260px",
            height: "150px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "80px",
            marginBottom: "80px",
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected Receipt"
              style={{
                width: "270px",
                height: "300px",
                objectFit: "cover",
              }}
            />
          ) : (
            <Realreceipt
              style={{
                width: "270px",
                height: "300px",
              }}
            />
          )}
        </div>

        {/* 제출하기 버튼 */}
        <button
          css={Button.mainPinkButton({
            isDisabled: !selectedImage || ocrState.isPending, // 로딩 중 버튼 비활성화
            width: "120px",
            height: "40px",
          })}
          onClick={handleWriteReviewButtonClick}
          disabled={!selectedImage || ocrState.isPending}
          style={{
            backgroundColor:
              selectedImage && !ocrState.isPending ? "#F1729B" : "#E0E0E0",
            cursor:
              selectedImage && !ocrState.isPending ? "pointer" : "not-allowed",
          }}
        >
          {ocrState.isPending ? "분석 중..." : "제출하기"}
        </button>
      </div>
    </ReactModal>
  );
}
