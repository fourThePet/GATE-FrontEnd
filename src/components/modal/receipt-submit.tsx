import React, { useState } from "react";
import ReactModal from "react-modal";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Button } from "../../components/button/button";
import Realreceipt from "../../assets/svg/Realreceipt";
import { useNavigate } from "react-router-dom";
import NoBorderGrayButton from "../button/no-border-gray";
import { requestOCR } from "../../api/ocr";
import { OCRField } from "../../interfaces/ocr";
import { Receiptchecked, Receiptfail, Receiptloading } from "../../assets/svg";
import { BarLoader } from "react-spinners";
import { useGetPlacesInfo } from "../../queries";
import { notify } from "../../utils/constants";

type ReceiptSubmitProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeId: number; // placeId 추가
  latitude;
  longitude;
};

export default function ReceiptSubmit({
  isOpen,
  setIsOpen,
  placeId,
  latitude,
  longitude,
}: ReceiptSubmitProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ocrState, setOcrState] = useState({
    isPending: false,
    error: null,
    success: null,
  });

  const { data: placeInfo, error: placeError } = useGetPlacesInfo(placeId); // 컴포넌트 최상단에서 호출
  const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        // window.alert("JPG 또는 PNG 이미지만 업로드 가능합니다.");
        notify({
          type : "warning",
          text : "JPG 또는 PNG 이미지만 업로드 가능합니다."
        })
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
      // window.alert("이미지를 업로드해주세요.");
      notify({
        type : "warning",
        text : "이미지를 업로드해주세요."
      })
      return;
    }

    if (placeError || !placeInfo) {
      console.error("장소 정보를 가져오는 데 실패했습니다:", placeError);
      setOcrState({
        isPending: false,
        error: "장소 정보를 가져오는 데 실패했습니다.",
        success: false,
      });
      return;
    }

    const roadAddress = placeInfo.roadAddress || ""; // 장소의 roadAddress 가져오기
    setOcrState({ isPending: true, error: null, success: null });

    try {
      const file = await fetch(selectedImage).then((res) => res.blob());
      const ocrResponse = await requestOCR([file as File]);

      const fields: OCRField[] = ocrResponse?.images?.[0]?.fields || [];
      // console.log("fields 데이터:", fields);

      const allText = fields.map((field) => field.inferText).join(" ");
      const isReceipt =
        allText.includes(roadAddress) &&
        (allText.includes("영수증") ||
          allText.includes("금액") ||
          allText.includes("합계") ||
          allText.includes("판매일자") ||
          allText.includes("카드금액"));

      if (isReceipt) {
        setOcrState({ isPending: false, error: null, success: true });
      } else {
        setOcrState({
          isPending: false,
          error: "영수증 판별 실패",
          success: false,
        });
      }
    } catch (error) {
      console.error("OCR 분석 실패:", error);
      setOcrState({ isPending: false, error: "OCR 요청 실패", success: false });
      // window.alert("해당 장소의 영수증이 맞는지 확인해주세요!");
      notify({
        type : "warning",
        text : "해당 장소의 영수증이 맞는지 확인해주세요!"
      })
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Receipt Submit Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        },
        content: {
          position: "absolute",
          width: "400px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "16px",
          backgroundColor: "#fff",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
          border: "none",
        },
      }}
    >
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

      {ocrState.isPending ? (
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          })}
          style={{ display: "flex", marginTop: "30%" }}
        >
          <Receiptloading width="20%" height="20%" fill="#F1729B" />
          <span css={typo.Heading2} style={{ marginTop: "70px" }}>
            제출된 영수증을 확인 중입니다.
          </span>
          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            잠시만 기다려 주세요.
          </span>
          {/* BarLoader 추가 */}
          <BarLoader
            color="#F1729B"
            width="80%"
            cssOverride={{
              marginTop: "90px",
              borderRadius: "10px",
            }}
          />
        </div>
      ) : ocrState.success ? (
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          })}
          style={{ display: "flex", marginTop: "30%" }}
        >
          <Receiptchecked width="20%" height="20%" fill="#F1729B" />
          <span css={typo.Heading2} style={{ marginTop: "70px" }}>
            인증이 완료되었어요!
          </span>
          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            이제 리뷰를 남겨주세요.
          </span>
          <button
            css={Button.mainPinkButton({
              isDisabled: false,
              width: "120px",
              height: "40px",
            })}
            onClick={() =>
              navigate(`/review/write/${placeId}`, {
                state: {
                  receiptCertificate: true,
                  placeId,
                  latitude,
                  longitude,
                }, // receiptCertificate 값을 state로 전달
              })
            }
            style={{ marginTop: "130px" }}
          >
            확인
          </button>
        </div>
      ) : ocrState.success === false ? (
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          })}
          style={{ display: "flex", marginTop: "30%" }}
        >
          <Receiptfail width="20%" height="20%" fill="#F1729B" />
          <span css={typo.Heading2} style={{ marginTop: "50px" }}>
            인증에 실패했어요.
          </span>

          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            1. 해당 장소의 영수증이 맞는지
          </span>
          <span
            css={typo.Body2}
            style={{ color: "#9A9EA6", marginTop: "-10px" }}
          >
            확인해주세요.
          </span>
          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            2. 전화번호, 사업자 번호, 주소가
          </span>
          <span
            css={typo.Body2}
            style={{ color: "#9A9EA6", marginTop: "-10px" }}
          >
            잘 나온 사진을 넣어주세요.
          </span>
          <button
            css={Button.mainPinkButton({
              isDisabled: false,
              width: "120px",
              height: "40px",
            })}
            onClick={() => window.location.reload()}
            style={{ marginTop: "60px" }}
          >
            확인
          </button>
        </div>
      ) : (
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          })}
        >
          <span css={typo.Heading2}>영수증 제출하기</span>
          <input
            type="file"
            accept="image/*"
            id="file-input"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <NoBorderGrayButton
            isDisabled={false}
            onClick={() => document.getElementById("file-input")?.click()}
            width="80px"
            height="40px"
            title="첨부하기"
          />
          <div
            style={{
              width: "260px",
              height: "150px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "90px",
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
          <button
            css={Button.mainPinkButton({
              isDisabled: !selectedImage,
              width: "120px",
              height: "40px",
            })}
            onClick={handleWriteReviewButtonClick}
            disabled={!selectedImage}
            style={{
              backgroundColor: selectedImage ? "#F1729B" : "#E0E0E0",
              cursor: selectedImage ? "pointer" : "not-allowed",
              marginTop: "20px",
            }}
          >
            제출하기
          </button>
        </div>
      )}
    </ReactModal>
  );
}
