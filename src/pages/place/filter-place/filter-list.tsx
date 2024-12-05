import { useEffect, useState } from "react";
import { Block } from "../../../components/block/block";
import { typo } from "../../../styles/typo";
import {
  conditionStyle,
  dogSize,
  filterContainer,
  placeStyle,
  sizeFilter,
} from "./index.styles";
import {
  Ldogpink,
  Ldogwhite,
  Mdogpink,
  Mdogwhite,
  Sdogpink,
  Sdogwhite,
} from "../../../assets/svg";
import { Button } from "../../../components/button/button";
import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

interface FilterSectionProps {
  setFilters: Dispatch<
    SetStateAction<{
      conditions: Record<string, boolean>;
      facilities: Record<string, boolean>;
      dogSize: "SMALL" | "MEDIUM" | "LARGE" | null;
    }>
  >;
}

export default function FilterSection({ setFilters }: FilterSectionProps) {
  const [selectedDogSize, setSelectedDogSize] = useState<
    "SMALL" | "MEDIUM" | "LARGE" | null
  >(null);
  const [selectedConditions, setSelectedConditions] = useState<
    Record<string, boolean>
  >({
    isLeashRequired: false,
    isMuzzleRequired: false,
    isCageRequired: false,
    isVaccinationComplete: false,
  });

  const [selectedFacilities, setSelectedFacilities] = useState<
    Record<string, boolean>
  >({
    parkingAvailable: false,
    indoorAvailable: false,
    outdoorAvailable: false,
  });

  // 필터 변경 시 전달
  useEffect(() => {
    setFilters({
      conditions: selectedConditions,
      facilities: selectedFacilities,
      dogSize: selectedDogSize,
    });
  }, [selectedDogSize, selectedConditions, selectedFacilities, setFilters]);

  const handleDogSizeClick = (size: "SMALL" | "MEDIUM" | "LARGE") => {
    setSelectedDogSize(size);
  };

  const handleConditionClick = (key: keyof typeof selectedConditions) => {
    setSelectedConditions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFacilityClick = (key: keyof typeof selectedFacilities) => {
    setSelectedFacilities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div css={filterContainer}>
      {/* 견종 크기 */}
      <div
        css={[
          Block.flexBlock,
          css`
            flex-direction: column;
            gap: 2vh;
          `,
        ]}
      >
        <span css={typo.Heading2}>견종 크기</span>
        <div css={sizeFilter}>
          {/* 소형 */}
          <div css={dogSize} onClick={() => handleDogSizeClick("SMALL")}>
            {selectedDogSize === "SMALL" ? (
              <Sdogpink css={{ width: "90px", height: "90px" }} />
            ) : (
              <Sdogwhite css={{ width: "90px", height: "90px" }} />
            )}
            <span
              css={typo.Body2}
              style={{
                color: selectedDogSize === "SMALL" ? "#000000" : "#8E8E93",
                cursor: "pointer",
                margin: "auto",
              }}
            >
              소형
            </span>
          </div>

          {/* 중형 */}
          <div css={dogSize} onClick={() => handleDogSizeClick("MEDIUM")}>
            {selectedDogSize === "MEDIUM" ? (
              <Mdogpink css={{ width: "90px", height: "90px" }} />
            ) : (
              <Mdogwhite css={{ width: "90px", height: "90px" }} />
            )}
            <span
              css={typo.Body2}
              style={{
                color: selectedDogSize === "MEDIUM" ? "#000000" : "#8E8E93",
                cursor: "pointer",
                margin: "auto",
              }}
            >
              중형
            </span>
          </div>

          {/* 대형 */}
          <div css={dogSize} onClick={() => handleDogSizeClick("LARGE")}>
            {selectedDogSize === "LARGE" ? (
              <Ldogpink css={{ width: "90px", height: "90px" }} />
            ) : (
              <Ldogwhite css={{ width: "90px", height: "90px" }} />
            )}
            <span
              css={typo.Body2}
              style={{
                color: selectedDogSize === "LARGE" ? "#000000" : "#8E8E93",
                cursor: "pointer",
                margin: "auto",
              }}
            >
              대형
            </span>
          </div>
        </div>
      </div>

      {/* 입장 조건 */}
      <div
        css={[
          Block.flexBlock,
          css`
            flex-direction: column;
            gap: 2vh;
          `,
        ]}
      >
        <span css={typo.Heading2}>입장 조건</span>
        <div css={conditionStyle}>
          {[
            { key: "isLeashRequired", label: "리드줄을 착용했어요 〰️" },
            { key: "isMuzzleRequired", label: "입마개는 필수예요 🐾" },
            { key: "isCageRequired", label: "케이지를 사용했어요 🙏" },
            { key: "isVaccinationComplete", label: "접종을 완료했어요 💉" },
          ].map(({ key, label }) => (
            <button
              key={key}
              css={
                selectedConditions[key as keyof typeof selectedConditions]
                  ? Button.mainPinkButton({
                      isDisabled: false,
                      width: "100%",
                      height: "50px",
                    })
                  : Button.grayBorderButton({
                      width: "100%",
                      height: "50px",
                    })
              }
              onClick={() =>
                handleConditionClick(key as keyof typeof selectedConditions)
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 공간/시설 */}
      <div
        css={[
          Block.flexBlock,
          css`
            flex-direction: column;
            gap: 2vh;
          `,
        ]}
      >
        <span css={typo.Heading2}>공간/시설</span>
        <div css={placeStyle}>
          {[
            { key: "parkingAvailable", label: "주차 가능 🅿️" },
            { key: "indoorAvailable", label: "실내 가능 🛋️" },
            { key: "outdoorAvailable", label: "실외 가능 🌳" },
          ].map(({ key, label }) => (
            <button
              key={key}
              css={
                selectedFacilities[key as keyof typeof selectedFacilities]
                  ? Button.mainPinkButton({
                      isDisabled: false,
                      width: "100%",
                      height: "50px",
                    })
                  : Button.grayBorderButton({
                      width: "100%",
                      height: "50px",
                    })
              }
              onClick={() =>
                handleFacilityClick(key as keyof typeof selectedFacilities)
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
