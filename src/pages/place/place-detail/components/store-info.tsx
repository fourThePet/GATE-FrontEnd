import { Block } from "../../../../components/block/block";
import { Heart, HeartFill } from "../../../../assets/svg";
import { typo } from "../../../../styles/typo";
import { ContentContainer } from "../index.styles";
import { useState, useEffect } from "react";
import { Divider2 } from "../../../../styles/ui";
import { BasicInfoContainer } from "../index.styles";
import { useGetPlacesInfo } from "../../../../queries/places";
import {
  usePostFavorite,
  usePatchFavorite,
} from "../../../../queries/favorites";
import {
  Parkingavailabe,
  Sdogav,
  Mdogav,
  Ldogav,
  Cagenecessary,
  Extracharge,
  Vaccinnecessary,
  Mouthnecessary,
  Indoorav,
  Outdoorav,
  Ropenecessary,
} from "../../../../assets/svg";
import { useAuthStore } from "../../../../stores/useAuthStore";
import axios from "axios";
import { HeaderContainer } from "../index.styles";
import BackTitleHeader from "../../../../components/header/back-title";
import { useNavigate } from "react-router-dom";
import { PlaceReviewList } from "./review-gpt";
import { ReviewProps } from "../../../../interfaces/reviews";

export default function StoreInfo({ placeId }: ReviewProps) {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
  const { isLoggedIn } = useAuthStore(); // 로그인 여부 가져오기

  // React Query로 장소 정보 가져오기
  const { data: storeData, isLoading, isError } = useGetPlacesInfo(placeId);
  // 초기 로드 시 favorites 값에 따라 isLiked 상태 설정

  useEffect(() => {
    if (storeData?.favorites === "Y") {
      setIsLiked(true); // favorites 값이 "Y"라면 isLiked를 true로 설정
    }
  }, [storeData]);
  // 즐겨찾기 등록 및 삭제 API
  const postFavoriteMutation = usePostFavorite();
  const patchFavoriteMutation = usePatchFavorite();

  const toggleHeart = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      window.location.href = "/login";
      return;
    }

    if (isLiked) {
      patchFavoriteMutation.mutate(placeId, {
        onSuccess: () => {
          console.log("즐겨찾기 삭제");
          setIsLiked(false);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            // AxiosError로 처리
            if (error.response?.status === 401) {
              alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
              window.location.href = "/login";
            } else {
              console.error("즐겨찾기 삭제 실패:", error.response?.data);
              alert("즐겨찾기 삭제 중 문제가 발생했습니다.");
            }
          } else {
            console.error("알 수 없는 오류:", error);
            alert("예기치 못한 문제가 발생했습니다.");
          }
        },
      });
    } else {
      postFavoriteMutation.mutate(placeId, {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            // AxiosError로 처리
            if (error.response?.status === 401) {
              alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
              window.location.href = "/login";
            } else {
              console.error("즐겨찾기 등록 실패:", error.response?.data);
              alert("즐겨찾기 등록 중 문제가 발생했습니다.");
            }
          } else {
            console.error("알 수 없는 오류:", error);
            alert("예기치 못한 문제가 발생했습니다.");
          }
        },
        onSuccess: () => {
          console.log("즐겨찾기 등록 성공");
          setIsLiked(true);
        },
      });
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const interpretSizeAvailable = (size: string) => {
    switch (size) {
      case "SMALL":
        return <Sdogav width={"50px"} height={"50px"} />;
      case "MEDIUM":
        return <Mdogav width={"50px"} height={"50px"} />;
      case "LARGE":
        return <Ldogav width={"50px"} height={"50px"} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 상태
  }

  if (isError || !storeData) {
    return <div>장소 정보를 가져오는 데 실패했습니다.</div>; // 에러 처리
  }

  const interpretSizeKorea = (size: string) => {
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
      <div css={HeaderContainer}>
        <BackTitleHeader
          title={storeData.name}
          handleBackButtonClick={handleBackButtonClick}
        />
      </div>
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
            onClick={toggleHeart}
            style={{ marginTop: "20px", cursor: "pointer" }}
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
        <p css={typo.Body2} style={{ marginBottom: "10px", color: "#9A9EA6" }}>
          {storeData.lotAddress}
        </p>
        <PlaceReviewList placeId={placeId} />{" "}
      </div>
      {/* 정보 아이콘 */}
      <div
        css={{
          display: "flex",
          overflowX: "auto", // 가로 스크롤 활성화
          overflowY: "hidden", // 세로 스크롤 비활성화
          whiteSpace: "nowrap", // 줄바꿈 방지
          padding: "10px 0",
          gap: "30px",
          marginLeft: "20px",
          marginRight: "10px",
        }}
      >
        {storeData.additionalPetFee >= 1 && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Extracharge width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>
              동반 추가:{storeData.additionalPetFe}원{" "}
            </p>
          </div>
        )}

        {storeData.sizeAvailable && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            {interpretSizeAvailable(storeData.sizeAvailable)}
            <p style={{ fontSize: "12px", marginTop: "5px" }}>
              {interpretSizeKorea(storeData.sizeAvailable)}
            </p>
          </div>
        )}
        {storeData.isLeashRequired === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Ropenecessary width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>목줄 필수</p>
          </div>
        )}
        {storeData.isMuzzleRequired === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Mouthnecessary width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>입마개 필수</p>
          </div>
        )}
        {storeData.isCageRequired === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Cagenecessary width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>케이지 필수</p>
          </div>
        )}
        {storeData.isVaccinationComplete === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Vaccinnecessary width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>접종 완료</p>
          </div>
        )}
        {storeData.indoorAvailable === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Indoorav width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>실내 가능</p>
          </div>
        )}
        {storeData.outdoorAvailable === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Outdoorav width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>야외 가능</p>
          </div>
        )}
        {storeData.parkingAvailable === "Y" && (
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <Parkingavailabe width={"50px"} height={"50px"} />
            <p style={{ fontSize: "12px", marginTop: "5px" }}>주차 가능</p>
          </div>
        )}
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
            - 입장료: {storeData.admissionFee}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 휴무일: {storeData.holiday}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 운영 시간: {storeData.operatingHours}
          </li>

          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 데이터 마지막 수정일: {storeData.lastUpdated}
          </li>
        </ul>
      </div>
    </>
  );
}
