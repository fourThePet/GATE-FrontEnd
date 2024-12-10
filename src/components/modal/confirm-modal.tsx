import React from "react";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import { HeartFill } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

type Props = {
  isOpen: boolean; // 모달 열림/닫힘 상태
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
  title: string; // 제목 텍스트
  subText?: string; // 부가 설명 텍스트 (옵션)
  confirmText?: string; // 확인 버튼 텍스트
  onConfirm?: () => void; // 확인 버튼 클릭 핸들러 (옵션)
  placeId: number; // 이동할 placeId
};

export default function ConfirmModal({
  isOpen,
  setIsOpen,
  title,
  subText,
  confirmText = "확인", // 기본값 설정
  onConfirm,
  placeId,
}: Props) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const closeModal = () => setIsOpen(false); // 모달 닫기 핸들러

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // 확인 클릭 시 핸들러 실행
    closeModal(); // 모달 닫기
    navigate(`/place/detail/${placeId}`, { state: { placeId } }); // placeId를 동적으로 포함
  };

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
          position: "absolute", // 절대 위치
          width: "320px",
          height: "280px",
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
          onClick={handleConfirm} // 확인 버튼 클릭 시 handleConfirm 호출
        >
          {confirmText}
        </button>
      </div>
    </ReactModal>
  );
}
