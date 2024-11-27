import { useState, useEffect } from "react";
import SearchFilterHeader from "../place/components/search-bar/index";
import { buttonContainer, containerStyle } from "./index.styles";
import KakaoMap from "../place/components/map-api/kakaomap";
import CategoryList from "../place/components/category/category-search";
import { useNavigate } from "react-router-dom";
import { MainPinkButton } from "../../components";
import PlaceCard from "./components/category/place-card";
import axios from "axios";

const getCategoryIcon = (name) => {
  const iconMap = {
    전체: "🐾",
    식당: "🍴",
    카페: "☕",
    병원: "🏥",
    약국: "💊",
    반려동물용품: "🦴",
    미용: "✂️",
    숙소: "🏡",
    문화시설: "🎨",
  };
  return iconMap[name] || "🐾";
};

export default function Place() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await axios
          .get(`${import.meta.env.VITE_BASE_URL}/places/categories`)
          .then((res) => res.data);

        if (data.isSuccess) {
          const categorieIcons = [
            { id: 0, name: "전체", icon: getCategoryIcon("전체") },
            ...data.result.map((category) => ({
              ...category,
              icon: getCategoryIcon(category.name),
            })),
          ];
          setCategories(categorieIcons);
        } else {
          console.error("카테고리 로드 실패: ", data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterButtonClick = () => {
    console.log("필터 적용 페이지 호출");
    navigate("/place/filter");
  };

  const handleSearchSubmit = (value) => {
    console.log("검색어:", value);
  };

  const handleCategoryClick = (category) => {
    console.log(`${category} 카테고리 클릭됨`);
  };

  const handleButtonClick = () => {
    navigate("/place/list");
  };

  return (
    <div css={containerStyle}>
      <SearchFilterHeader
        handleFilterButtonClick={handleFilterButtonClick}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div>
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>
      <div>
        <PlaceCard />
      </div>
      <div>
        <KakaoMap />
      </div>
      <div css={buttonContainer}>
        <MainPinkButton
          onClick={handleButtonClick}
          isDisabled={false} // 비활성화 여부
          title={"목록 보기"}
          width="10vh"
          height="4vh"
        />
      </div>
    </div>
  );
}
