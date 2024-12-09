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
import { MainPinkButton } from "../../components";
import { useGetPlacesCategories } from "../../queries";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryIcon } from "../../utils/translations";
import ResultPlace from "./place-detail/components/result-place";
import { css } from "@emotion/react";
import { useLocationStore } from "../../stores/useLocationState";
import { useGetPlaces } from "../../api";
import { PlacesParam } from "../../interfaces/places";
import { useSpring, animated } from "react-spring";
import FilterPlace from "./filter-place";
import { Button } from "../../components/button/button";

export default function Place() {
  const location = useLocation();
  const { data } = useGetPlacesCategories();
  const [categories, setCategories] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "전체";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState("목록 보기");
  const { latitude, longitude } = useLocationStore();
  const navigate = useNavigate();

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
      category: isAll ? undefined : selectedCategory,
      size: size,
      entryConditions: entryConditions,
      types: types,
    };
  }, [selectedCategory, latitude, longitude, size, entryConditions, types]);

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
    if (isFilterModalOpen) {
      setIsFilterModalOpen(false);
    } else {
      setIsFilterModalOpen(true);
    }
  };

  const handleSearchSubmit = (value) => {
    console.log("검색어:", value);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate(`/place?category=${encodeURIComponent(category)}`)
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
    transform: isModalOpen ? "translateY(40%)" : "translateY(100%)",
    opacity: isModalOpen ? 1 : 0,
    config: {
      tension: 200, // 낮추면 더 부드러워짐
      friction: 15, // 높이면 더 빠르게 멈춤
      mass: 1, // 질량 조절 (기본값 1)
      clamp: true, // 애니메이션 끝에서 튀어오르지 않도록 함
    },
  });

  const filterAnimation = useSpring({
    transform: isFilterModalOpen ? "translateY(40%)" : "translateY(100%)",
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
        element.style.transform = "translateY(80%)";
        element.style.transition = "transform 0.3s ease"; // 부드러운 애니메이션 추가
      });
    } else if (bottomTabs2) {
      Array.from(bottomTabs2).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(80%)";
        element.style.transition = "transform 0.3s ease"; // 부드러운 애니메이션 추가
      });
    } else {
      Array.from(bottomTabs).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(0)";
      });
    }
  };

  const handleTopTab = () => {
    const bottomTabs = document.getElementsByClassName("checkFilterBottomTab");
    const bottomTabs2 = document.getElementsByClassName("checkPlaceBottomTab");

    // 바깥쪽 스크롤을 하는것을 감지해서 필터 내리기
    if (isFilterModalOpen) {
      Array.from(bottomTabs).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(40%)";
        element.style.transition = "transform 0.3s ease"; // 부드러운 애니메이션 추가
      });
    } else if (isModalOpen) {
      Array.from(bottomTabs2).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(40%)";
        element.style.transition = "transform 0.3s ease"; // 부드러운 애니메이션 추가
      });
    } else {
      Array.from(bottomTabs).forEach((tab) => {
        const element = tab as HTMLElement;
        element.style.transform = "translateY(0)";
      });
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
      <div css={buttonContainer({isModalOpen, isFilterModalOpen})}>
        <MainPinkButton
          onClick={handleButtonClick}
          isDisabled={false}
          title={buttonText}
          width="10vh"
          height="4vh"
        />
      </div>
      {/* TODO : 에이든 - 목록,필터 보기 작업분 */}
      {/* 라운드 적용 && 슬라이드 tap 바텀 to 탑 */}
      {isFilterModalOpen && (
        <div css={modalOverlay}>
          <animated.div
            css={modalContent}
            style={filterAnimation}
            className="checkFilterBottomTab"
          >
            <div css={modalContent} ref={modalRef}>
              <div
                css={css`
                  // margin-bottom: 30%;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // margin-bottom: 15px;
                  `}
                >
                  <button
                    css={Button.pinkBorderButton({
                      width: "50px",
                      height: "20px",
                    })}
                    onClick={handleTopTab}
                  >
                    TOP
                  </button>
                </div>
                <FilterPlace setIsFilterModalOpen={setIsFilterModalOpen}/>
                {/* <FilterSection
                  setFilters={setFilters}
                  latitude={latitude}
                  longitude={longitude}
                /> */}
              </div>
            </div>
          </animated.div>
        </div>
      )}
      {isModalOpen && (
        <div css={modalOverlay}>
          <animated.div
            css={modalContent}
            style={animation}
            className="checkPlaceBottomTab"
            // ref={modalRef}
          >
            {/* TODO : 버버거림 원인 : 컴포넌트 마진,패딩 체크 */}
            {/* 디자인 바꾸시면서 마진 없애시면 될거같아요 ~! */}

            {/* <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                // margin-bottom: 15px;
              `}
            >
              <button
                css={Button.pinkBorderButton({
                  width: "50px",
                  height: "2s0px",
                })}
                onClick={handleTopTab}
              >
                TOP
              </button>
            </div>
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
            </div> */}
            <ResultPlace places={places} />
          </animated.div>
        </div>
      )}
    </div>
  );
}
