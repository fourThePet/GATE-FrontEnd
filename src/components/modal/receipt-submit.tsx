import React from "react";
import ReactModal from "react-modal";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";

type ReceiptSubmitProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReceiptSubmit({
  isOpen,
  setIsOpen,
}: ReceiptSubmitProps) {
  const closeModal = () => setIsOpen(false);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Receipt Submit Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        },
        content: {
          //   position: "relative",
          width: "400px",
          height: "500px",
          margin: "auto",
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
          right: "10px",
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
        <span css={typo.Heading4}>영수증 제출 하기</span>

        {/* 부가 텍스트 */}
        <span
          css={typo.Body3}
          style={{
            textAlign: "center",
            color: "#9A9EA6",
            marginTop: "-10px",
          }}
        >
          전화번호, 사업자 번호, 주소가 <br />잘 나온 사진을 넣어주세요!
        </span>

        {/* 영수증 이미지 */}
        <div
          style={{
            width: "260px",
            height: "150px",
            borderRadius: "10px",
            backgroundColor: "#F3F4F6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 이미지 삽입 */}
          <img
            src="/path/to/receipt-image.png" // 실제 영수증 이미지 경로로 수정
            alt="영수증 이미지"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* 확인 버튼 */}
        <button
          css={Button.mainPinkButton({
            isDisabled: false,
            width: "120px",
            height: "40px",
          })}
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </ReactModal>
  );
}
