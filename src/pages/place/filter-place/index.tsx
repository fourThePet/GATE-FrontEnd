import { useLocation, useNavigate } from "react-router-dom";
import FilterSection from "./filter-list";
import { Block } from "../../../components/block/block";
import { css } from "@emotion/react";
import colors from "../../../styles/colors";
import {
  // useEffect,
  useMemo,
  useState,
} from "react";
import { useLocationStore } from "../../../stores/useLocationState";
import { GrayBorderButton, MainPinkButton } from "../../../components";

interface Props {
  setIsFilterModalOpen?: (isOpen: boolean) => void;
}
export default function FilterPlace({ setIsFilterModalOpen }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
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

    const queryParams = new URLSearchParams(location.search);

    // query 값 유지, 필터 초기화
    queryParams.delete("entryConditions");
    queryParams.delete("size");
    queryParams.delete("types");

    setIsFilterModalOpen(false);
    navigate(`/place?${queryParams.toString()}`);
  };

  const handleApply = () => {
    const queryParams = new URLSearchParams(location.search);

    // 기존 query 값 유지
    const query = queryParams.get("query");

    const newQueryParams = {
      query, // 기존 query 유지
      latitude: latitude,
      longitude: longitude,
      category: category, // 기존 카테고리 유지
      size: filters.dogSize || undefined,
      entryConditions: Object.keys(filters.conditions)
        .filter((key) => filters.conditions[key])
        .join(","),
      types: Object.keys(filters.facilities)
        .filter((key) => filters.facilities[key])
        .join(","),
    };

    const queryString = Object.entries(newQueryParams)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&");

    setIsFilterModalOpen(false);
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
        <GrayBorderButton
          title="초기화"
          width="50%"
          height="48px"
          onClick={handleReset}
        />
        <MainPinkButton
          title="적용하기"
          width="50%"
          height="48px"
          onClick={handleApply}
        />
      </div>
    </div>
  );
}
