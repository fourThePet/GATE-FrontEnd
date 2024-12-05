import { useLocation, useNavigate } from "react-router-dom";
import { PageWrapper } from "../../styles/ui";
import { Logowithshadow } from "../../assets/svg";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Receipt } from "../../assets/svg";
import { Write } from "../../assets/svg";
import { useState } from "react";
import ReceiptSubmit from "../../components/modal/receipt-submit";

export default function ReceiptCheck() {
  const navigate = useNavigate();
  const location = useLocation(); // 전달된 state를 가져옴
  const placeId = location.state?.placeId; // placeId 가져오기
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleWriteReviewButtonClick = () => {
    navigate(`/review/writereview/${placeId}`, {
      state: {
        placeId,
        receiptCertificate: false, // receiptCertificate 값을 추가로 전달
      },
    });
  };

  const openReceiptModal = () => {
    setIsReceiptModalOpen(true); // 모달 열기
  };

  return (
    <>
      <div css={PageWrapper}>
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            gap: "30px",
          })}
        >
          <Logowithshadow
            css={{ width: "100%", height: "200px" }}
            style={{ marginTop: "30%" }}
          />
          <span css={typo.Heading2}>다녀온 곳의 리뷰를 써보세요 !</span>
          {/* 영수증 인증 및 작성하기 버튼 */}
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "center",
              gap: "60px",
            })}
            // style={{ marginTop: "20px" }}
          >
            {/* 영수증 인증 카드 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "140px",
                height: "140px",
                borderRadius: "16px",
                gap: "10px",
              })}
              style={{
                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0px 6px 6px rgba(0, 0, 0, 0.1)";
              }}
              onClick={openReceiptModal} // 클릭 시 모달 열기
            >
              <Receipt css={{ width: "40px", height: "40px" }} />
              <div css={typo.Body2} style={{ textAlign: "center" }}>
                영수증
              </div>
            </div>

            {/* 작성하기 카드 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "140px",
                height: "140px",
                borderRadius: "16px",
                gap: "10px",
              })}
              style={{
                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0px 6px 6px rgba(0, 0, 0, 0.1)";
              }}
              onClick={handleWriteReviewButtonClick}
            >
              <Write css={{ width: "40px", height: "40px" }} />
              <div css={typo.Body2} style={{ textAlign: "center" }}>
                작성하기
              </div>
            </div>
          </div>
        </div>
        {/* 문구 */}
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          })}
          style={{
            marginTop: "15%", // 버튼 하단 여백 추가
            padding: "0 20px", // 좌우 여백 추가
            textAlign: "center", // 중앙 정렬
          }}
        >
          <span
            css={typo.Heading4}
            style={{
              color: "#9A9EA6",
            }}
          >
            영수증 인증 후 리뷰를 작성하면 리뷰 상단에 노출 되며, <br />
            신뢰성 높은 정보를 제공할 수 있어요.
          </span>
        </div>
        {/* ReceiptSubmit 모달 */}
        <ReceiptSubmit
          isOpen={isReceiptModalOpen}
          setIsOpen={setIsReceiptModalOpen}
        />
      </div>
    </>
  );
}
