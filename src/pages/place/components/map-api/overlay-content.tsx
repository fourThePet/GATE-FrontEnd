import React, { useEffect, useState } from "react";
import { Heart, HeartFill } from "../../../../assets/svg";
import { useAuthStore } from "../../../../stores/useAuthStore";
import axios from "axios";
import {
  usePostFavorite,
  usePatchFavorite,
} from "../../../../queries/favorites";
import { notify } from "../../../../utils/constants";
interface OverlayContentProps {
  placeInfo: any;
  placeId: number;
  onClose: () => void;
  navigate: (path: string, options?: any) => void;
}

const OverlayContent: React.FC<OverlayContentProps> = ({
  placeInfo,
  placeId,
  onClose,
  navigate,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [favoritesNum, setFavoritesNum] = useState(
    placeInfo?.favoritesNum || 0
  ); // 즐겨찾기 수 상태
  const { isLoggedIn } = useAuthStore(); // 로그인 여부
  const postFavoriteMutation = usePostFavorite();
  const patchFavoriteMutation = usePatchFavorite();

  // 초기화
  useEffect(() => {
    if (placeInfo?.favorites === "Y") {
      setIsLiked(true);
    }
  }, [placeInfo]);

  const toggleHeart = () => {
    if (!isLoggedIn) {
      // alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      notify({
        type: "warning",
        text: "로그인이 필요합니다. 로그인 후 다시 시도해주세요.",
        onClose: () => {
          window.location.href = "/login";
        },
      });
      return;
    }

    if (isLiked) {
      patchFavoriteMutation.mutate(placeId, {
        onSuccess: () => {
          setIsLiked(false);
          setFavoritesNum((prev) => Math.max(0, prev - 1)); // 즐겨찾기 수 감소
        },
        onError: handleFavoriteError,
      });
    } else {
      postFavoriteMutation.mutate(placeId, {
        onSuccess: () => {
          setIsLiked(true);
          setFavoritesNum((prev) => prev + 1); // 즐겨찾기 수 증가
        },
        onError: handleFavoriteError,
      });
    }
  };

  const handleFavoriteError = (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
        // window.location.href = "/login";
        notify({
          type: "warning",
          text: "로그인이 필요합니다. 로그인 후 다시 시도해주세요.",
          onClose: () => {
            window.location.href = "/login";
          },
        });
      } else {
        // console.error("즐겨찾기 처리 실패:", error.response?.data);
        // alert("즐겨찾기 처리 중 문제가 발생했습니다.");
        notify({
          type: "error",
          text: "즐겨찾기 처리 중 문제가 발생했습니다.",
        });
      }
    } else {
      // console.error("알 수 없는 오류:", error);
      // alert("예기치 못한 문제가 발생했습니다.");
      notify({
        type: "error",
        text: "문제가 발생했습니다. 관리자에게 문의하세요",
      });
    }
  };

  const handleOverlayClick = () => {
    navigate(
      `/place/detail/${placeInfo.id}?latitude=${placeInfo.latitude}&longitude=${placeInfo.longitude}`,
      {
        replace: false,
        state: { placeId },
      }
    );
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "relative",
        width: "100%",
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        padding: "15px",
        zIndex: 1000, // z-index 추가
      }}
    >
      {/* 타이틀과 닫기 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          {placeInfo.name}
        </div>
        <div
          style={{
            cursor: "pointer",
            fontSize: "25px",
            color: "#999",
          }}
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 방지
            onClose();
          }}
        >
          ×
        </div>
      </div>

      {/* 콘텐츠 */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        {/* 이미지 */}
        <div style={{ width: "90px", height: "90px", marginRight: "10px" }}>
          <img
            src={placeInfo?.photoUrl || "/images/no-image.png"}
            alt={placeInfo.name}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* 리뷰 및 정보 */}
        <div style={{ flex: 1, fontSize: "14px", color: "#666" }}>
          <div style={{ gap: "15px" }}>
            <span style={{ color: "#F1729B", fontWeight: "bold" }}>★</span>
            <span style={{ fontWeight: "bold", color: "#9A9EA6" }}>
              {/* {parseFloat(placeInfo.starAvg).toFixed(1)} ({placeInfo.reviewNum}) */}
              {placeInfo.starAvg
                ? parseFloat(placeInfo.starAvg).toFixed(1)
                : "0.0"}{" "}
              ({placeInfo.reviewNum || 0})
            </span>
          </div>
          <div style={{ marginTop: "5px", color: "#9A9EA6" }}>
            {placeInfo.category}
          </div>

          <div
            style={{
              marginTop: "3px",
              color: "#9A9EA6",
              maxWidth: "40%", // 부모 컨테이너의 80% 너비 제한
              minWidth: "170px", // 최소 너비 설정
              wordBreak: "break-word", // 긴 단어 강제 줄바꿈
              overflowWrap: "break-word", // 줄바꿈 보장
              whiteSpace: "normal", // 기본 줄바꿈
            }}
          >
            {placeInfo?.lotAddress}
          </div>
          <div
            style={{
              fontWeight: "bold",
              marginTop: "5px",
              color: "#333",
            }}
          >
            {
              isNaN(placeInfo.distance)
                ? "0 km"
                : placeInfo.distance < 1
                ? `${Math.round(placeInfo.distance * 1000)} m` // 미터로 변환
                : `${placeInfo.distance.toFixed(1)} km` // 소수점 첫째 자리까지 킬로미터로 표시
            }{" "}
          </div>
        </div>

        {/* 즐겨찾기 버튼 */}
        <div
          onClick={(e) => {
            e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
            toggleHeart();
          }}
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
            cursor: "pointer",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            {isLiked ? (
              <HeartFill width="20px" height="20px" color="#F1729B" />
            ) : (
              <Heart width="20px" height="20px" color="#111111" />
            )}
          </div>
          <span
            style={{
              fontSize: "16px",
              color: "#888888",
              fontWeight: "600",
              marginTop: "5px",
            }}
          >
            {favoritesNum}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverlayContent;
