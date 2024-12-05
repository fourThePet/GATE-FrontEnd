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
import { useLocation, useNavigate } from "react-router-dom";
import { MainPinkButton } from "../../components";
import { useGetPlacesCategories } from "../../queries";
import { useEffect, useMemo, useState } from "react";
import { categoryIcon } from "../../utils/translations";
import ResultPlace from "./place-detail/components/result-place";
import { typo } from "../../styles/typo";
import colors from "../../styles/colors";
import { css } from "@emotion/react";
import { NoticeIcon } from "../../assets/svg";
import { useLocationStore } from "../../stores/useLocationState";
import { useGetPlaces } from "../../api";
import { PlacesParam } from "../../interfaces/places";

export default function Place() {
  const navigate = useNavigate();
  const { data } = useGetPlacesCategories();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState("목록 보기");
  const { latitude, longitude } = useLocationStore();

  /** Filter 페이지에서 쿼리스트링으로 넘겨준 필터링값을 받아오기 */
  const { search } = useLocation();

  /** 필터 페이지에서 넘겨준 쿼리스트링 기반으로 파라메터 생성 */
  const {
    entryConditions,
    latitude: currentLatitude,
    longitude: currentLongitude,
    size,
    types,
  } = useMemo(() => {
    const params = new URLSearchParams(search);
    const queryParams: {
      size?: string;
      entryConditions?: string[];
      types?: string[];
      latitude?: number;
      longitude?: number;
    } = {};
    for (const [key, value] of params) {
      // entryConditions과, types는 컴마(,) 로 구분된 string 배열 형식
      if (key === "entryConditions" || key === "types")
        queryParams[key] = value.split(",");
      else queryParams[key] = value;
    }

    return queryParams;
  }, [search]);

  /** 시설 리스트 조회 Query */
  const placesQuery = useMemo<PlacesParam>(() => {
    // '전체' 카테고리 선택시 쿼리 스트링에서 카테고리 제거
    const isAll = selectedCategory === "전체";

    return {
      latitude,
      longitude,
      category: isAll ? undefined : selectedCategory,
      size: size,
      entryConditions: entryConditions,
      types: types,
    };
  }, [selectedCategory, latitude, longitude, size, entryConditions, types]);

  /** 위에서 생성한 Query 기반으로 시설 리스트 조회 */
  const { places } = useGetPlaces(placesQuery);

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
    navigate(`/place/filter?lat=${latitude}&lng=${longitude}`);
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
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
      </div>
      <div>
        <KakaoMap
          places={places}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          setSelectedCategory={setSelectedCategory}
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
            <ResultPlace places={places} />
          </div>
        </div>
      )}
    </div>
  );
}
