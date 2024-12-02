import SearchFilterHeader from "../place/components/search-bar/index";
import { buttonContainer, containerStyle } from "./index.styles";
import KakaoMap from "../place/components/map-api/kakaomap";
import CategoryList from "../place/components/category/category-search";
import { useNavigate } from "react-router-dom";
import { MainPinkButton } from "../../components";
import PlaceCard from "./components/category/place-card";
import { useGetPlacesCategories } from "../../queries";
import { useEffect, useState } from "react";
import { categoryIcon } from "../../utils/translations";


export default function Place() {
  const navigate = useNavigate();
  const { data  } = useGetPlacesCategories();
  const [categories, setCategories] = useState([])

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
