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
import { useGetPlacesCategories } from "../../queries";
import { useEffect, useState } from "react";
import { categoryIcon } from "../../utils/translations";

export default function PlaceList() {
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
