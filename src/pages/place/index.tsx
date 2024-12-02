import SearchFilterHeader from "../place/components/search-bar/index";
import { buttonContainer, containerStyle } from "./index.styles";
import KakaoMap from "../place/components/map-api/kakaomap";
import CategoryList from "../place/components/category/category-search";
import { useNavigate } from "react-router-dom";
import { MainPinkButton } from "../../components";
import PlaceCard from "./components/category/place-card";
import { useGetPlacesCategories } from "../../api/places";

export default function Place() {
  const navigate = useNavigate();
  const { categories } = useGetPlacesCategories();

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
