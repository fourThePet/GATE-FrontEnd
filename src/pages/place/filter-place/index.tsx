import { useLocation, useNavigate } from "react-router-dom";
import FilterSection from "./filter-list";
import { Block } from "../../../components/block/block";
import { css } from "@emotion/react";
import colors from "../../../styles/colors";
import { 
  // useEffect, 
  useMemo, 
  useState } from "react";
import { useLocationStore } from "../../../stores/useLocationState";
import { GrayBorderButton, MainPinkButton } from "../../../components";

interface Props {
  setIsFilterModalOpen? : (isOpen:boolean) => void;
  
}
export default function FilterPlace({setIsFilterModalOpen } : Props) {
  const navigate = useNavigate();
  const  location  = useLocation();
  const [filters, setFilters] = useState({
    conditions: {
      isLeashRequired: false,
      isMuzzleRequired: false,
      isCageRequired: false,
      isVaccinationComplete: false,
    },
    facilities: {
      parkingAvailable: false,
      indoorAvailable: false,
      outdoorAvailable: false,
    },
    dogSize: null,
  });
  const { latitude, longitude } = useLocationStore();

  // 쿼리스트링에서 카테고리 값을 추출
  const { category } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return { category: params.get("category") || "전체" }; // 기본값: 전체
  }, [location.search]);

  const handleReset = () => {
    setFilters({
      conditions: {
        isLeashRequired: false,
        isMuzzleRequired: false,
        isCageRequired: false,
        isVaccinationComplete: false,
      },
      facilities: {
        parkingAvailable: false,
        indoorAvailable: false,
        outdoorAvailable: false,
      },
      dogSize: null,
    });
    setIsFilterModalOpen(false)  // 모달 닫기
    navigate("/place"); // 초기화된 상태로 리다이렉션
  };

  const handleApply = () => {
    // 쿼리 스트링에 포함할 값 정의
    const queryParams = {
      latitude: latitude, // 위도 추가
      longitude: longitude, // 경도 추가
      category: category, // 기존 카테고리 유지
      size: filters.dogSize || undefined, // 강아지 크기 필터
      entryConditions: Object.keys(filters.conditions)
        .filter((key) => filters.conditions[key]) // 선택된 조건 필터
        .join(","),
      types: Object.keys(filters.facilities)
        .filter((key) => filters.facilities[key]) // 선택된 시설 필터
        .join(","),
    };

    // 쿼리 스트링 생성
    const queryString = Object.entries(queryParams)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      ) // 값이 유효한 경우만 포함
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&");

    console.log("생성된 쿼리스트링:", queryString);
    setIsFilterModalOpen(false)  // 모달 닫기
    // 생성된 쿼리스트링을 사용해 리다이렉트
    navigate(`/place?${queryString}`);
  };

  return (
    <div
      css={[
        Block.flexBlock,
        css`
          flex-direction: column;
          background-color: ${colors.color.White1};
        `,
      ]}
    >
      <div>
        <FilterSection setFilters={setFilters} />
      </div>
      <div
        css={[
          Block.flexBlock({
            direction: "row",
            gap: "1vw",
            justifyContent: "center",
            margin: "30px 0 100px 0",
            padding: "30px",
          }),
        ]}
      >
        <GrayBorderButton title="초기화" width="50%" height="48px" onClick={handleReset}/>
        <MainPinkButton title="적용하기" width="50%" height="48px" onClick={handleApply} />
      </div>
    </div>
  );
}
