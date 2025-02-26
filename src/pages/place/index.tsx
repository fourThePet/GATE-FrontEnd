import SearchFilterHeader from "../place/components/search-bar/index";
import {
  buttonContainer,
  containerStyle,
  modalContent,
  modalOverlay,
} from "./index.styles";
import KakaoMap from "../place/components/map-api/kakaomap";
import CategoryList from "../place/components/category/category-search";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingBar, MainPinkButton } from "../../components";
import { useGetPlacesCategories } from "../../queries";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryIcon } from "../../utils/translations";
import ResultPlace from "./place-detail/components/result-place";
import { css } from "@emotion/react";
import { useLocationStore } from "../../stores/useLocationState";
import { useGetPlaces } from "../../api";
import { PlacesParam } from "../../interfaces/places";
import { useSpring } from "react-spring";
import FilterPlace from "./filter-place";
import { AnimatedProps } from "react-spring";
import { CSSObject, SerializedStyles } from "@emotion/react";
import { animated } from "@react-spring/web";
import colors from "../../styles/colors";
import usePageMeta from "../../utils/usePageMeta";
// import { useGetPlacesBySearch } from "../../queries";
type AnimatedDivProps = AnimatedProps<{
  className?: string;
  css?: SerializedStyles | CSSObject;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;

export default function Place() {
  usePageMeta("GATE | 장소", "GATE 장소"); //seo 검색 최적화
  const location = useLocation();
  const { data, isLoading: isCategoryLoading } = useGetPlacesCategories();
  const [categories, setCategories] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "전체";
  const initialQuery = queryParams.get("query") || ""; // 검색어 기본값: 빈 문자열
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState("목록 보기");
  const { latitude, longitude } = useLocationStore();
  const navigate = useNavigate();

  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isModalOpen || isFilterModalOpen) {
      if (isFirstOpen) {
        setShowMessage(true);
        setIsFirstOpen(false);

        setTimeout(() => {
          setShowMessage(false);
        }, 1500);
      }
    }
  }, [isModalOpen, isFilterModalOpen]);

  /** Filter 페이지에서 쿼리스트링으로 넘겨준 필터링값을 받아오기 */
  const { search } = useLocation();

  /** 필터 페이지에서 넘겨준 쿼리스트링 기반으로 파라메터 생성 */
  const {
    entryConditions,
    category,
    latitude: currentLatitude,
    longitude: currentLongitude,
    size,
    types,
  } = useMemo(() => {
    const params = new URLSearchParams(search);
    const queryParams: {
      category?: string;
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
      query: queryParams.get("query") || undefined, // 검색어 추가
      category: isAll ? undefined : selectedCategory,
      size: size,
      entryConditions: entryConditions,
      types: types,
    };
  }, [
    selectedCategory,
    latitude,
    longitude,
    size,
    entryConditions,
    types,
    queryParams,
  ]);

  useEffect(() => {
    setSelectedCategory(category || "전체");
  }, [category]);

  /* 홈화면에서 전달받은 카테고리 */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("category") || "전체";
    setSelectedCategory(categoryFromQuery);
  }, [location.search]);

  /** 위에서 생성한 Query 기반으로 시설 리스트 조회 */
  const { places } = useGetPlaces(placesQuery);

  /** 위에서 생성한 Query 기반으로 시설 리스트 조회 */
  // const {
  //   data: placesData,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading: isPlacesLoading,
  // } = useGetPlacesBySearch(placesQuery);

  // /** places 데이터 가공 */
  // const places = useMemo(() => {
  //   return placesData?.pages.flatMap((page) => page.content) || [];
  // }, [placesData]);

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
    
    if (isFilterModalOpen) {
      setIsFilterModalOpen(false);
    } else {
      setIsFilterModalOpen(true);
    }
  };

  const handleSearchSubmit = (value: string) => {
    

    const queryParams = new URLSearchParams(location.search);

    // 기존 query 값을 대체
    queryParams.set("query", value);

    // URL에 검색어 추가 후 navigate 호출
    navigate(`/place?${queryParams.toString()}`);

    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("category", category);
    navigate(`/place?${queryParams.toString()}`);
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

  const animation = useSpring({
    transform: isModalOpen ? "translateY(50%)" : "translateY(100%)",
    opacity: isModalOpen ? 1 : 0,
    config: {
      tension: 200, // 낮추면 더 부드러워짐
      friction: 15, // 높이면 더 빠르게 멈춤
      mass: 1, // 질량 조절 (기본값 1)
      clamp: true, // 애니메이션 끝에서 튀어오르지 않도록 함
    },
  });

  const filterAnimation = useSpring({
    transform: isFilterModalOpen ? "translateY(50%)" : "translateY(100%)",
    opacity: isFilterModalOpen ? 1 : 0,
    config: {
      tension: 200, // 낮추면 더 부드러워짐
      friction: 15, // 높이면 더 빠르게 멈춤
      mass: 1, // 질량 조절 (기본값 1)
      clamp: true, // 애니메이션 끝에서 튀어오르지 않도록 함
    },
  });

  const modalRef = useRef(null);

  useEffect(() => {
    const kakaoMapElements = document.getElementsByClassName("kakaoMap");

    Array.from(kakaoMapElements).forEach((element) => {
      element.addEventListener("click", handleKakaoMapClick);
    });

    return () => {
      Array.from(kakaoMapElements).forEach((element) => {
        element.removeEventListener("click", handleKakaoMapClick);
      });
    };
  }, [isFilterModalOpen]);

  const handleKakaoMapClick = () => {
    const bottomTabs = document.getElementsByClassName("checkFilterBottomTab");
    const bottomTabs2 = document.getElementsByClassName("checkPlaceBottomTab");

    if (isFilterModalOpen && bottomTabs) {
      Array.from(bottomTabs).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(76%)";
        element.style.transition = "transform 0.3s ease";
      });
    } else if (bottomTabs2) {
      Array.from(bottomTabs2).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(76%)";
        element.style.transition = "transform 0.3s ease";
      });
    } else {
      Array.from(bottomTabs).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(0)";
      });
    }
  };

  const handleTopTab = () => {
    const adjustTranslateY = (elements: HTMLCollectionOf<Element>) => {
      Array.from(elements).forEach((tab) => {
        const element = tab as HTMLElement;
        const currentTransform = element.style.transform;
        let newTranslateY = "0%";

        if (currentTransform.includes("76%")) {
          newTranslateY = "50%";
        } else if (currentTransform.includes("50%")) {
          newTranslateY = "0%";
        } else if (currentTransform.includes("0%")) {
          newTranslateY = "76%";
        }

        element.style.transform = `translateY(${newTranslateY})`;
        element.style.transition = "transform 0.3s ease";
      });
    };

    if (isFilterModalOpen) {
      adjustTranslateY(document.getElementsByClassName("checkFilterBottomTab"));
    } else if (isModalOpen) {
      adjustTranslateY(document.getElementsByClassName("checkPlaceBottomTab"));
    }
  };

  const AnimatedDiv: React.FC<AnimatedDivProps> = animated.div;
  if (isCategoryLoading) {
    return <LoadingBar />;
  }

  return (
    <div css={containerStyle}>
      <SearchFilterHeader
        handleFilterButtonClick={handleFilterButtonClick}
        handleSearchSubmit={handleSearchSubmit}
        initialQuery={initialQuery}
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
      <div css={buttonContainer({ isModalOpen, isFilterModalOpen })}>
        {places && places.length > 0 && (
          <MainPinkButton
            onClick={handleButtonClick}
            isDisabled={false}
            width="100px"
            height="4vh"
          >
            {buttonText}
          </MainPinkButton>
        )}
      </div>
      {isFilterModalOpen && (
        <div css={modalOverlay}>
          <AnimatedDiv
            className="checkFilterBottomTab"
            css={modalContent}
            style={filterAnimation}
          >
            {/* 최초 열림 메시지 */}
            {showMessage && (
              <div
                css={css`
                  position: absolute;
                  top: 40px;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: rgba(0, 0, 0, 0.7);
                  color: white;
                  padding: 8px 12px;
                  border-radius: 8px;
                  font-size: 14px;
                  z-index: 999;
                `}
              >
                회색바를 통해 컨텐츠 길이를 조절할 수 있어요!
              </div>
            )}
            <div css={modalContent} ref={modalRef}>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <button
                  css={css`
                    background-color: ${colors.color.Gray5};
                    border: none;
                    width: 50px;
                    height: 8px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                      background-color: ${colors.color.Gray3};
                      transition: background-color 0.3s ease;
                    }
                  `}
                  onClick={handleTopTab}
                />
              </div>
              <FilterPlace setIsFilterModalOpen={setIsFilterModalOpen} />
            </div>
          </AnimatedDiv>
        </div>
      )}
      {isModalOpen && (
        <div css={modalOverlay}>
          <AnimatedDiv
            css={modalContent}
            style={animation}
            className="checkPlaceBottomTab"
          >
            {/* 최초 열림 메시지 */}
            {showMessage && (
              <div
                css={css`
                  position: absolute;
                  top: 40px;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: rgba(0, 0, 0, 0.7);
                  color: white;
                  padding: 8px 12px;
                  border-radius: 8px;
                  font-size: 14px;
                  z-index: 999;
                `}
              >
                회색바를 통해 컨텐츠 길이를 조절할 수 있어요!
              </div>
            )}
            <div css={modalContent} ref={modalRef}>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: 10px;
                `}
              >
                <button
                  css={css`
                    background-color: ${colors.color.Gray5};
                    border: none;
                    width: 50px;
                    height: 8px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                      background-color: ${colors.color.Gray3};
                      transition: background-color 0.3s ease;
                    }
                  `}
                  onClick={handleTopTab}
                />
              </div>
              <ResultPlace places={places} />
            </div>
          </AnimatedDiv>
        </div>
      )}
    </div>
  );
}
