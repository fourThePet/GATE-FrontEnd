import React, { useState } from "react";
import SearchFilterHeader from "./components/index";
import {
  containerStyle,
  resultItemStyle,
  resultsListStyle,
} from "./index.styles";
import KakaoMap from "./components/map-api/kakaomap";

const Search: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);

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
        <KakaoMap />
      </div>
    </div>
  );
};

export default Search;
