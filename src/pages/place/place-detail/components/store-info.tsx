import { Block } from "../../../../components/block/block";
import { Heart, HeartFill } from "../../../../assets/svg";
import { typo } from "../../../../styles/typo";
import { ContentContainer } from "../index.styles";
import { useState } from "react";
import { Divider2 } from "../../../../styles/ui";
import { BasicInfoContainer } from "../index.styles";
import { useGetPlacesInfo } from "../../../../queries/places";

export default function StoreInfo() {
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
  const placeId = 1; // 임시로 고정된 placeId

  // React Query로 장소 정보 가져오기
  const { data: storeData, isLoading, isError } = useGetPlacesInfo(placeId);

  const toggleHeart = () => {
    setIsLiked(!isLiked); // 클릭 시 상태 토글
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 상태
  }

  if (isError || !storeData) {
    return <div>장소 정보를 가져오는 데 실패했습니다.</div>; // 에러 처리
  }

  const interpretSizeAvailable = (size: string) => {
    switch (size) {
      case "SMALL":
        return "소형견";
      case "MEDIUM":
        return "중형견";
      case "LARGE":
        return "대형견";
      default:
        return "알 수 없음";
    }
  };

  return (
    <>
      {/* 이미지 */}
      <div
        css={Block.flexBlock({
          direction: "column",
          width: "100%",
        })}
      >
        <img
          src={storeData.photoUrl}
          alt={storeData.name}
          css={Block.flexBlock({
            width: "100%",
            height: "auto",
          })}
        />
      </div>

      {/* 콘텐츠 */}
      <div css={ContentContainer}>
        <span css={typo.Body3} style={{ color: "#9A9EA6" }}>
          {storeData.category} | {storeData.lotAddress}
        </span>
        <div
          css={Block.flexBlock({
            direction: "row", // 가로 방향 배치
            alignItems: "center", // 세로 정렬
            justifyContent: "space-between", // 양쪽 정렬
            width: "100%", // 부모 컨테이너 너비에 맞춤
          })}
        >
          <h1
            css={typo.Heading1}
            style={{ marginTop: "20px", marginBottom: "-5px" }}
          >
            {storeData.name}
          </h1>
          <div
            onClick={toggleHeart} // 클릭 이벤트 추가
            style={{ marginTop: "20px", cursor: "pointer" }} // 클릭 가능하도록 커서 스타일 추가
          >
            {isLiked ? (
              <HeartFill css={{ width: "24px", height: "24px" }} />
            ) : (
              <Heart
                css={{ width: "24px", height: "24px", color: "#9A9EA6" }}
              />
            )}
          </div>
        </div>
        <p css={typo.Body2} style={{ marginBottom: "-5px", color: "#9A9EA6" }}>
          {storeData.lotAddress}
        </p>
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "5px",
          })}
        >
          <span css={typo.Body1} style={{ color: "#F1729B" }}>
            ★
          </span>
          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            4.1 (105)
          </span>
        </div>
      </div>
      <Divider2 />
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>기본 정보</h2>
        <ul style={{ marginLeft: "20px" }}>
          <li
            css={typo.Body2}
            style={{
              color: "#888888",
              wordBreak: "break-all", // 너무 길어사 줄바꿈
              whiteSpace: "normal", // 기본 줄바꿈
              lineHeight: "1.5", // 줄 간격 조정
            }}
          >
            - 홈페이지: {storeData.websiteUrl}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 전화번호: {storeData.phoneNumber}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 휴무일: {storeData.holiday}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 운영 시간: {storeData.operatingHours}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.parkingAvailable}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 데이터 마지막 수정일: {storeData.lastUpdated}
          </li>
        </ul>
      </div>
      <Divider2 />
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>제한 사항</h2>
        <ul style={{ marginLeft: "20px" }}>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 애견 동반시 추가요금: {storeData.additionalPetFee}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 입장 가능 크기: {interpretSizeAvailable(storeData.sizeAvailable)}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.isLeashRequired}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.isMuzzleRequired}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.isCageRequired}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.isVaccinationComplete}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.indoorAvailable}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - {storeData.outdoorAvailable}
          </li>
        </ul>
      </div>
    </>
  );
}
