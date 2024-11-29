import CategoryList from "../place/components/category/category-search";
import { containerStyle } from "../place/index.styles";
import { buttonContainer, noticeStyle } from "./index.styles";
import BackSearchHeader from "../../components/header/back-search";
import { useNavigate } from "react-router-dom";
import { typo } from "../../styles/typo";
import colors from "../../styles/colors";
import { css } from "@emotion/react";
import { NoticeIcon } from "../../assets/svg";
import ResultPlace from "./components/result-place";
import MainPinkButton from "../../components/button/main-pink";
import getPlacesCategories from "../../api/places";

export default function PlaceList() {
  const navigate = useNavigate();
  const { categories } = getPlacesCategories();

  const handleSearchSubmit = (value) => {
    console.log("검색어:", value);
  };

  const handleCategoryClick = (category) => {
    console.log(`${category} 카테고리 클릭됨`);
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
          width="10vh"
          height="4vh"
        />
      </div>
    </div>
  );
}
