import CategoryList from "../place/components/category/category-search";
import { useState } from "react";
import {
  containerStyle,
  resultItemStyle,
  resultsListStyle,
} from "../place/index.styles";
import { buttonContainer, noticeStyle } from "./index.styles";
import BackSearchHeader from "../../components/header/back-search";
import { useNavigate } from "react-router-dom";
import { typo } from "../../styles/typo";
import colors from "../../styles/colors";
import { css } from "@emotion/react";
import { NoticeIcon } from "../../assets/svg";
import ResultPlace from "./components/result-place";
import MainPinkButton from "../../components/button/main-pink";

export default function PlaceList() {
  const [results, setResults] = useState<string[]>([]);
  const navigate = useNavigate();
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

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const handleMapButtonClick = () => {
    navigate("/place");
  };

  return (
    <div css={containerStyle}>
      <BackSearchHeader
        handleSearchSubmit={handleSearchSubmit}
        handleBackButtonClick={handleBackButtonClick}
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
      <CategoryList
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
      <div css={noticeStyle}>
        <NoticeIcon width={18} height={18} />
        <label
          css={css`
            ${typo.Label1};
            color: ${colors.color.Gray1};
            padding: 5px 0;
            font-weight: 400;
          `}
        >
          원하는 장소를 선택해보세요
        </label>
      </div>
      <ResultPlace />
      <div css={buttonContainer}>
        <MainPinkButton
          onClick={handleMapButtonClick}
          isDisabled={false} // 비활성화
          title={"지도보기"}
          width="120px"
          height="50px"
        />
      </div>
    </div>
  );
}
