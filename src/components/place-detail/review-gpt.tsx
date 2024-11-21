import { useState } from "react";
import { typo } from "../../styles/typo";
import { BasicInfoContainer } from "../../pages/place-detail/index.styles";
import { Block } from "../block/block";
import { Writereview } from "../../assets/svg";
import { Gpt } from "../../assets/svg";
export default function ReviewGpt() {
  const [activeTab, setActiveTab] = useState<"high" | "low">("high"); // 탭 상태

  const handleTabClick = (tab: "high" | "low") => {
    setActiveTab(tab);
  };

  return (
    <>
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        {/* 상단 리뷰 제목 및 아이콘 */}
        <div
          css={Block.flexBlock({
            direction: "row", // 가로 방향 배치
            alignItems: "center", // 세로 정렬
            justifyContent: "space-between", // 양쪽 정렬
            width: "100%", // 부모 컨테이너 너비에 맞춤
          })}
        >
          <h1 css={typo.Heading3}>리뷰</h1>
          <Writereview css={{ width: "70px", height: "70px" }} />{" "}
        </div>

        {/* 평점 표시 */}
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "5px",
          })}
          style={{ marginTop: "-15px" }}
        >
          <span css={typo.Body1} style={{ color: "#FFAB2E" }}>
            ★
          </span>
          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            4.1 (105)
          </span>
        </div>
        <div
          css={Block.flexBlock({
            direction: "column",
            border: "1px solid #E0E0E0",
            borderRadius: "20px",
            padding: "20px",
            gap: "20px",
          })}
          style={{ marginTop: "30px" }}
        >
          {/*ChatGPT로 최근 후기를 요약했어요*/}
          <div
            css={Block.flexBlock({
              direction: "row",
              alignItems: "center",
              gap: "5px",
            })}
            style={{ marginTop: "10px" }}
          >
            <Gpt
              css={{ width: "30px", height: "30px" }}
              style={{ marginRight: "10px" }}
            />
            <span css={typo.Heading4}>ChatGPT로 최근 후기를 요약했어요</span>
          </div>

          {/* 탭 */}
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "20px 0",
              padding: "10px",
              width: "100%",
              border: "1px bottom solid #E0E0E0",
              borderRadius: "10px",
            })}
            style={{ backgroundColor: "#F8F8F8" }}
          >
            <div
              onClick={() => handleTabClick("high")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "high" ? "bold" : "normal",
              }}
            >
              높은 평점 요약
            </div>
            <div
              onClick={() => handleTabClick("low")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "low" ? "bold" : "normal",
              }}
            >
              낮은 평점 요약
            </div>
          </div>

          {/* 탭 내용 */}
          <div
            css={Block.flexBlock({
              direction: "column",
              //   gap: "10px",
              padding: "10px",
              // border: "1px solid #E0E0E0",
              borderRadius: "10px",
            })}
            style={{ marginTop: "-30px" }}
          >
            {activeTab === "high" && (
              <p css={typo.Body2}>
                주차가 다소 불편하다는 의견이 있으나, 기계식 주차가 가능하여
                편리함도 제공합니다. 전반적으로 깨끗하고 깔끔한 분위기를
                유지하며, 인근에 식당과 마트가 있어 편리합니다. 특히 세탁기와
                시설이 잘 갖춰져 있어 자취하는 느낌을 주며, 테라스와 쾌적한
                객실로 만족스러운 숙박 경험을 제공합니다.
              </p>
            )}
            {activeTab === "low" && (
              <p css={typo.Body2}>
                다만, 수건 상태나 청소 관련 지적도 있으니 주의가 필요합니다.
                다양한 편의시설과 함께 가성비 좋은 선택으로 추천됩니다.
              </p>
            )}
          </div>

          {/* 리뷰 정확성 알림 */}
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <p
              css={typo.Body3}
              style={{
                color: "#9A9EA6",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              ※ 리뷰 요약이 정확하지 않거나 표현이 어색할 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
