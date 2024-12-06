import { useLocation, useNavigate } from "react-router-dom";
import BackTitleHeader from "../../../components/header/back-title";
import FilterSection from "./filter-list";
import { headerContainer } from "../../../components/header/back-search";
import { Block } from "../../../components/block/block";
import { css } from "@emotion/react";
import { Button } from "../../../components/button/button";
import colors from "../../../styles/colors";
import { useMemo, useState } from "react";
import { useLocationStore } from "../../../stores/useLocationState";

export default function FilterPlace() {
  const navigate = useNavigate();
  const { search } = useLocation();
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
    const params = new URLSearchParams(search);
    return { category: params.get("category") || "전체" }; // 기본값: 전체
  }, [search]);

  const handleBackButtonClick = () => {
    navigate(-1); // 뒤로 가기
  };

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
      <div css={headerContainer}>
        <BackTitleHeader
          handleBackButtonClick={handleBackButtonClick}
          title="필터"
        />
      </div>
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
        <button
          css={Button.pinkBorderButton({
            width: "260px",
            height: "60px",
          })}
          onClick={handleReset}
        >
          초기화
        </button>
        <button
          css={Button.mainPinkButton({
            isDisabled: false,
            width: "260px",
            height: "60px",
          })}
          onClick={handleApply}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
