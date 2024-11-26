import { useState } from "react";
import SearchFilterHeader from "./components/search-bar/index";
import {
  containerStyle,
  resultItemStyle,
  resultsListStyle,
} from "./index.styles";
import KakaoMap from "./components/map-api/kakaomap";
import CategoryList from "./components/category/category-search";
import PlaceCard from "../search-place/components/category/place-card";
import { Button } from "../../components/button/button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function Place() {
  const [results, setResults] = useState<string[]>([]);

  const categories = [
    { id: 1, label: "전체", icon: "🏨" },
    { id: 2, label: "식당", icon: "🍴" },
    { id: 3, label: "카페", icon: "☕" },
    { id: 4, label: "여행지", icon: "🏨" },
    { id: 5, label: "동물병원", icon: "🗺️" },
    { id: 6, label: "동물약국", icon: "🍴" },
    { id: 7, label: "문예회관", icon: "☕" },
    { id: 8, label: "반려동물용품", icon: "🏨" },
    { id: 9, label: "미용", icon: "🗺️" },
    { id: 10, label: "위탁관리", icon: "🍴" },
    { id: 11, label: "펜션", icon: "☕" },
    { id: 12, label: "호텔", icon: "🏨" },
    { id: 13, label: "미술관", icon: "🗺️" },
    { id: 14, label: "박물관", icon: "🗺️" },
  ];
  2;
  const handleFilterButtonClick = () => {
    console.log("필터적용페이지호출");
  };

  const handleSearchSubmit = (value: string) => {
    console.log("검색어:", value);

    const dummyResults = ["Place 1", "Place 2", "Place 3"].filter((place) =>
      place.toLowerCase().includes(value.toLowerCase())
    );
    setResults(dummyResults);
  };

  const handleCategoryClick = (category: string) => {
    console.log(`${category} 카테고리 클릭됨`);
    const dummyResults = ["Place 1", "Place 2", "Place 3"].filter((place) =>
      place.toLowerCase().includes(category.toLowerCase())
    );
    setResults(dummyResults);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/place-list");
  };

  return (
    <div css={containerStyle}>
      <SearchFilterHeader
        handleFilterButtonClick={handleFilterButtonClick}
        handleSearchSubmit={handleSearchSubmit}
      />
      {results.length > 0 && (
        <ul css={resultsListStyle}>
          {results.map((result, index) => (
            <li key={index} css={resultItemStyle}>
              {result}
            </li>
          ))}
        </ul>
      )}
      <div>
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>
      <div>
        <KakaoMap />
      </div>
      <button
        onClick={handleButtonClick}
        css={[
          Button.mainPinkButton({
            isDisabled: false,
            width: "120px",
            height: "50px",
          }),
          css`
            font-size: 18px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            display: flex;
            position: fixed;
            transform: translateX(-50%);
            bottom: 27%;
            left: 50%;
          `,
        ]}
      >
        목록보기
      </button>
      <PlaceCard />
    </div>
  );
}
