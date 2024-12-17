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
import { LoadingBar } from "../../../../components";
import { Showmap, Calling, Homepage, Share } from "../../../../assets/svg";
import { notify } from "../../../../utils/constants";

export default function StoreInfo({
  placeId,
  onMapViewClick,
}: ReviewProps & { onMapViewClick: () => void }) {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
  const { isLoggedIn } = useAuthStore(); // 로그인 여부 가져오기
  const [, setIsRefreshing] = useState(false); // 새로고침 상태 관리

  // React Query로 장소 정보 가져오기
  const { data: storeData, isLoading, isError } = useGetPlacesInfo(placeId);

  useEffect(() => {
    if (storeData?.favorites === "Y") {
      setIsLiked(true); // favorites 값이 "Y"라면 isLiked를 true로 설정
    }
  }, [storeData]);
  // 즐겨찾기 등록 및 삭제 API
  const postFavoriteMutation = usePostFavorite();
  const patchFavoriteMutation = usePatchFavorite();

  const refreshPage = () => {
    setIsRefreshing(true); // 새로고침 상태 활성화
    setTimeout(() => {
      window.location.reload(); // 페이지 새로고침
    }, 500); // 500ms 동안 로딩 표시
  };

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
          refreshPage();
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
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
        onSuccess: () => {
          console.log("즐겨찾기 등록 성공");
          setIsLiked(true);
          refreshPage();
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
              window.location.href = "/login";
            } else {
              console.error("즐겨찾기 등록 실패:", error.response?.data);
              refreshPage();
            }
          } else {
            console.error("알 수 없는 오류:", error);
            alert("예기치 못한 문제가 발생했습니다.");
          }
        },
      });
    }
  };

  const handleBackButtonClick = () => {
    if (storeData?.latitude && storeData?.longitude) {
      navigate(
        `/place?latitude=${storeData.latitude}&longitude=${storeData.longitude}`
      );
    }
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
    return (
      <div css={{ alignItems: "center" }}>
        <LoadingBar />
      </div>
    ); // 로딩 중 상태
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
          style={{
            maxHeight: "300px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div css={ContentContainer}>
        <span css={typo.Body3} style={{ color: "#9A9EA6" }}>
          {storeData.category}
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
            style={{ marginTop: "0px", marginBottom: "-5px" }}
          >
            {storeData.name}
          </h1>
          <div
            onClick={toggleHeart}
            style={{
              width: "50px",
              height: "70px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
              marginTop: "10px",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              {isLiked ? (
                <HeartFill
                  css={{ width: "24px", height: "24px", color: "#000000" }}
                />
              ) : (
                <Heart
                  css={{ width: "24px", height: "24px", color: "#000000" }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: "16px",
                color: "#888888",
                fontWeight: "600",
              }}
            >
              {storeData.favoritesNum}
            </span>
          </div>
        </div>
        {/* 주소 */}
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "5px",
          })}
          style={{ marginBottom: "12px" }}
        >
          <img src="/images/location.png" />

          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            {storeData.roadAddress}
          </span>
          <Share
            css={{ width: "16px", height: "16px", cursor: "pointer" }}
            onClick={() => {
              if (storeData.roadAddress) {
                navigator.clipboard
                  .writeText(storeData.roadAddress)
                  .then(() => {
                    notify({
                      type: "success",
                      text: "주소가 클립보드에 복사되었습니다!",
                    });
                  })
                  .catch(() => {
                    notify({
                      type: "error",
                      text: "주소가 복사에 실패했습니다!",
                    });
                  });
              } else {
                notify({
                  type: "error",
                  text: "복사할 주소가 없습니다!",
                });
              }
            }}
          />
        </div>
        {/* 리뷰 */}
        <PlaceReviewList placeId={placeId} />{" "}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center", // 가운데 정렬
          gap: "20%", // 요소 간 간격
          alignItems: "center", // 세로 정렬
          marginTop: "20px",
        }}
      >
        {/* 전화하기 */}
        <div
          style={{ minWidth: "50px", textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            if (storeData.phoneNumber) {
              window.location.href = `tel:${storeData.phoneNumber}`;
            }
          }}
        >
          <Calling
            width={"40px"}
            height={"40px"}
            style={{ color: "#F8A8C2" }}
          />
          <p style={{ fontSize: "15px", marginTop: "5px", color: "#333333" }}>
            전화하기
          </p>
        </div>

        {/* 지도보기 */}
        <div
          style={{ minWidth: "50px", textAlign: "center", cursor: "pointer" }}
          onClick={onMapViewClick}
        >
          <Showmap
            width={"40px"}
            height={"40px"}
            style={{ color: "#F8A8C2" }}
          />
          <p style={{ fontSize: "15px", marginTop: "5px", color: "#333333" }}>
            지도보기
          </p>
        </div>

        {/* 홈페이지 */}
        <div
          style={{ minWidth: "50px", textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            if (storeData.websiteUrl !== "정보없음") {
              window.location.href = storeData.websiteUrl;
            } else {
              alert("홈페이지 정보가 없습니다!");
            }
          }}
        >
          <Homepage
            width={"40px"}
            height={"40px"}
            style={{ color: "#F8A8C2" }}
          />
          <p style={{ fontSize: "15px", marginTop: "5px", color: "#333333" }}>
            홈페이지
          </p>
        </div>
      </div>

      <Divider2 />

      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>이용 안내</h2>
        {/* 정보 아이콘 */}
        <div
          css={{
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
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

          {storeData.allowSizes && storeData.allowSizes.length > 0 && (
            <div style={{ display: "flex", gap: "30px", textAlign: "center" }}>
              {storeData.allowSizes.includes("SMALL") && (
                <div style={{ minWidth: "50px" }}>
                  {interpretSizeAvailable("SMALL")}
                  <p style={{ fontSize: "12px", marginTop: "5px" }}>
                    {interpretSizeKorea("SMALL")}
                  </p>
                </div>
              )}
              {storeData.allowSizes.includes("MEDIUM") && (
                <div style={{ minWidth: "50px" }}>
                  {interpretSizeAvailable("MEDIUM")}
                  <p style={{ fontSize: "12px", marginTop: "5px" }}>
                    {interpretSizeKorea("MEDIUM")}
                  </p>
                </div>
              )}
              {storeData.allowSizes.includes("LARGE") && (
                <div style={{ minWidth: "50px" }}>
                  {interpretSizeAvailable("LARGE")}
                  <p style={{ fontSize: "12px", marginTop: "5px" }}>
                    {interpretSizeKorea("LARGE")}
                  </p>
                </div>
              )}
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
        <ul style={{ marginLeft: "20px" }}>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            입장 조건
            <span style={{ color: "#F1729B" }}>
              {" "}
              {storeData.allowedSize}{" "}
            </span>{" "}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            입장료
            <span style={{ color: "#F1729B" }}>
              {" "}
              {storeData.admissionFee}{" "}
            </span>{" "}
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            휴무일 <span style={{ color: "#F1729B" }}>{storeData.holiday}</span>
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            운영 시간
            <span style={{ color: "#F1729B" }}>
              {" "}
              {storeData.operatingHours}{" "}
            </span>
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            데이터 마지막 수정일
            <span style={{ color: "#F1729B" }}> {storeData.lastUpdated} </span>
          </li>
        </ul>
      </div>
    </>
  );
}
