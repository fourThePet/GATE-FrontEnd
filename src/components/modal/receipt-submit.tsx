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

export default function ReceiptSubmit({
  isOpen,
  setIsOpen,
}: ReceiptSubmitProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 선택된 이미지 상태 관리

  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate(); // navigate 인스턴스 생성

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택한 파일 가져오기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // base64로 변환된 이미지 설정
      };
      reader.readAsDataURL(file); // 파일을 base64로 변환
    }
  };
  const handleWriteReviewButtonClick = () => {
    navigate("/review/writereview"); // 절대 경로로 이동
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
            isDisabled: !selectedImage, // 이미지가 없을 경우 비활성화
            width: "120px",
            height: "40px",
          })}
          onClick={handleWriteReviewButtonClick}
          disabled={!selectedImage} // 이미지가 없을 경우 비활성화
          style={{
            backgroundColor: selectedImage ? "#F1729B" : "#E0E0E0", // 선택 시 활성화 색상
            cursor: selectedImage ? "pointer" : "not-allowed", // 비활성화 시 커서 변경
            // marginTop: "20px",
          }}
        >
          제출하기
        </button>
      </div>
    </ReactModal>
  );
}
