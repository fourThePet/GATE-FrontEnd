import React from "react";
import ReactModal from "react-modal";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import { HeartFill } from "../../assets/svg";

type Props = {
  isOpen: boolean; // 모달 열림/닫힘 상태
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
  title: string; // 제목 텍스트
  subText?: string; // 부가 설명 텍스트 (옵션)
  confirmText?: string; // 확인 버튼 텍스트
  onConfirm?: () => void; // 확인 버튼 클릭 핸들러 (옵션)
};

export default function ConfirmModal({
  isOpen,
  setIsOpen,
  title,
  subText,
  confirmText = "확인", // 기본값 설정
  onConfirm,
}: Props) {
  const closeModal = () => setIsOpen(false); // 모달 닫기 핸들러

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confirm Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", // 배경 오버레이를 어둡게 설정
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000, // 오버레이가 항상 최상위에 위치하도록 설정
        },
        content: {
          position: "relative",
          width: "320px",
          height: "280px",
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
      <div
        css={Block.flexBlock({
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        })}
      >
        {/* 아이콘 (하트) */}
        <HeartFill
          css={{
            width: "40px",
            height: "40px",
            marginTop: "20px",
          }}
        />

        {/* 제목 */}
        <span css={typo.Heading4} style={{ textAlign: "center" }}>
          {title}
        </span>

        {/* 부가 설명 */}
        {subText && (
          <span
            css={typo.Body3}
            style={{ color: "#9A9EA6", textAlign: "center" }}
          >
            {subText}
          </span>
        )}

        {/* 확인 버튼 */}
        <button
          css={Button.mainPinkButton({
            isDisabled: false,
            width: "120px",
            height: "40px",
          })}
          onClick={() => {
            if (onConfirm) onConfirm(); // 확인 클릭 시 핸들러 실행
            closeModal(); // 모달 닫기
          }}
        >
          {confirmText}
        </button>
      </div>
    </ReactModal>
  );
}