import React from "react";
import { Heart, HeartFill } from "../../../../assets/svg";

interface OverlayContentProps {
  placeInfo: any;
  placeId: string;
  onClose: () => void;
  toggleHeart: () => void;
  isLiked: boolean;
  navigate: (path: string, options?: any) => void; // navigate를 props로 전달받음
}

const OverlayContent: React.FC<OverlayContentProps> = ({
  placeInfo,
  placeId,
  onClose,
  toggleHeart,
  isLiked,
  navigate,
}) => {
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
        width: "400px",
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        padding: "15px",
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
            src={placeInfo?.photoUrl || "https://via.placeholder.com/90x90"}
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
              {placeInfo.reviews || "4.5 (10)"}
            </span>
          </div>
          <div style={{ marginTop: "5px", color: "#9A9EA6" }}>
            {placeInfo.category}
          </div>
          <div style={{ marginTop: "3px", color: "#9A9EA6" }}>
            {placeInfo?.lotAddress}
          </div>
          <div
            style={{
              fontWeight: "bold",
              marginTop: "5px",
              color: "#333",
            }}
          >
            120m
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
            {placeInfo?.favoritesNum || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverlayContent;
