import {
  searchBarWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  categoryItemStyle,
  categoryWrapperStyle,
} from "../index.styles";
import { useNavigate } from "react-router-dom";

export default function SearchbarCategory() {
  const navigate = useNavigate();

  const handleSearchbarClick = () => {
    console.log("필터 적용 페이지 호출");
    navigate("/place"); // 검색바 클릭 시 페이지 이동
  };

  return (
    <>
      {/* 검색 바 */}
      <div css={searchBarWrapperStyle}>
        <div css={searchIconStyle}>🔍</div>
        <input
          css={searchInputStyle}
          placeholder="어디로 떠나시나요?"
          readOnly
          onClick={handleSearchbarClick}
        />
      </div>
      {/* 카테고리 */}
      <div css={categoryWrapperStyle}>
        {[
          { emoji: "🏨", label: "숙소" },
          { emoji: "☕", label: "카페" },
          { emoji: "🍴", label: "식당" },
          { emoji: "🎢", label: "문화시설" },
          { emoji: "🏥", label: "병원" },
          { emoji: "💊", label: "약국" },
          { emoji: "✂️", label: "미용" },
          { emoji: "🐶", label: "용품점" },
        ].map((item, index) => (
          <div key={index} css={categoryItemStyle}>
            <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
