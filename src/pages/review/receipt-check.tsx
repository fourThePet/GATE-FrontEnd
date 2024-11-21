import { PageWrapper } from "../../styles/ui";
import { Logowithshadow } from "../../assets/svg";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Receipt } from "../../assets/svg";
import { Write } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
export default function ReceiptCheck() {
  const navigate = useNavigate(); // navigate 인스턴스 생성

  const handleWriteReviewButtonClick = () => {
    navigate("/writereview"); // /receiptcheck 경로로 이동
  };
  return (
    <>
      <div css={PageWrapper}>
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            gap: "40px",
          })}
        >
          <Logowithshadow
            css={{ width: "200px", height: "200px" }}
            style={{ marginTop: "200px" }}
          />
          <span css={typo.Heading2}>다녀온 곳의 리뷰를 써보세요 !</span>
          {/* 영수증 인증 및 작성하기 버튼 */}
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "center",
              gap: "60px",
            })}
            style={{ marginTop: "20px" }}
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
      </div>

      {/* 문구 */}
      <div
        css={Block.flexBlock({
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
        })}
        style={{
          marginTop: "300px", // 버튼 하단 여백 추가
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
    </>
  );
}
