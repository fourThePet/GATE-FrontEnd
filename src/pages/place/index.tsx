import SearchFilterHeader from "../place/components/search-bar/index";
import {
  buttonContainer,
  containerStyle,
  modalContent,
  modalOverlay,
  noticeStyle,
} from "./index.styles";
import KakaoMap from "../place/components/map-api/kakaomap";
import CategoryList from "../place/components/category/category-search";
import { useNavigate } from "react-router-dom";
import { MainPinkButton } from "../../components";
import PlaceCard from "./components/category/place-card";
import { useGetPlacesCategories } from "../../queries";
import { useEffect, useState } from "react";
import { categoryIcon } from "../../utils/translations";
import ResultPlace from "./place-detail/components/result-place";
import { typo } from "../../styles/typo";
import colors from "../../styles/colors";
import { css } from "@emotion/react";
import { NoticeIcon } from "../../assets/svg";

export default function Place() {
  const navigate = useNavigate();
  const { data } = useGetPlacesCategories();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState("목록 보기");

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleButtonClick = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setButtonText("목록 보기");
    } else {
      setIsModalOpen(true);
      setButtonText("지도 보기");
    }
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
        <KakaoMap
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredPlaces={filteredPlaces}
          setFilteredPlaces={setFilteredPlaces}
        />
      </div>
      <div css={buttonContainer}>
        <MainPinkButton
          onClick={handleButtonClick}
          isDisabled={false}
          title={buttonText}
          width="10vh"
          height="4vh"
        />
      </div>
      {isModalOpen && (
        <div css={modalOverlay}>
          <div css={modalContent}>
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
            <ResultPlace places={filteredPlaces} />
          </div>
        </div>
      )}
    </div>
  );
}
