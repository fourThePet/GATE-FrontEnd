import { useEffect, useState } from "react";
import {
  searchBarWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  categoryItemStyle,
  categoryWrapperStyle,
} from "../index.styles";
import { useNavigate } from "react-router-dom";
import { useGetPlacesCategories } from "../../../queries";
import { categoryIcon } from "../../../utils/translations";

export default function SearchbarCategory() {
  const { data } = useGetPlacesCategories();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.isSuccess) {
      const processedCategories = [
        { id: 0, name: "전체", icon: categoryIcon("전체") },
        ...data.result.map((category: { id: number; name: string }) => ({
          ...category,
          icon: categoryIcon(category.name),
        })),
      ];
      setCategories(processedCategories);
    } else if (data && !data.isSuccess) {
      console.error(data.message || "카테고리 로드 실패");
    }
  }, [data]);

  const handleSearchbarClick = () => {
    console.log("필터 적용 페이지 호출");
    navigate("/place"); // 검색바 클릭 시 페이지 이동
  };
  const handleCategoryClick = (category) => {
    console.log(`${category} 필터 적용 페이지 호출`);
    navigate(`/place?category=${encodeURIComponent(category)}`); // 카테고리 값 전달
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
        {categories.slice(1).map((item) => (
          <div
            key={item.id}
            css={categoryItemStyle}
            onClick={() => handleCategoryClick(item.name)}
          >
            <span style={{ fontSize: "2rem" }}>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      >
        Break the world
      </button>
      ;
    </>
  );
}
