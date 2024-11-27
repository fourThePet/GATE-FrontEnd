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

interface FilterSectionProps {
  setFilters: (filters: {
    conditions: string[];
    places: string[];
    dogSize: "small" | "medium" | "large" | null;
  }) => void;
}

export default function FilterSection({ setFilters }: FilterSectionProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [selectedDogSize, setSelectedDogSize] = useState<
    "small" | "medium" | "large" | null
  >(null);

  // 선택 상태 변경 시 상위 컴포넌트에 업데이트
  useEffect(() => {
    setFilters({
      conditions: selectedConditions,
      places: selectedPlaces,
      dogSize: selectedDogSize,
    });
  }, [selectedConditions, selectedPlaces, selectedDogSize, setFilters]);

  const handleConditionClick = (condition: string) => {
    // 조건을 선택/해제하는 로직
    setSelectedConditions(
      (prev) =>
        prev.includes(condition)
          ? prev.filter((c) => c !== condition) // 이미 선택된 경우 제거
          : [...prev, condition] // 선택되지 않은 경우 추가
    );
  };
  const handlePlaceClick = (place: string) => {
    // 조건을 선택/해제하는 로직
    setSelectedPlaces(
      (prev) =>
        prev.includes(place)
          ? prev.filter((c) => c !== place) // 이미 선택된 경우 제거
          : [...prev, place] // 선택되지 않은 경우 추가
    );
  };
  const handleDogSizeClick = (size: "small" | "medium" | "large") => {
    setSelectedDogSize(size);
  };
  return (
    <div css={filterContainer}>
      {/* 견종크기 */}
      <div
        css={[
          Block.flexBlock,
          css`
            flex-direction: column;
            gap: 2vh;
          `,
        ]}
      >
        <span css={typo.Heading2}>견종크기</span>
        <div css={sizeFilter}>
          {/* 소형 아이 */}
          <div css={dogSize} onClick={() => handleDogSizeClick("small")}>
            {selectedDogSize === "small" ? (
              <Sdogpink css={{ width: "90px", height: "90px" }} />
            ) : (
              <Sdogwhite css={{ width: "90px", height: "90px" }} />
            )}
            <span
              css={typo.Body2}
              style={{
                color: selectedDogSize === "small" ? "#000000" : "#8E8E93",
                cursor: "pointer",
                margin: "auto",
              }}
            >
              소형
            </span>
          </div>

          {/* 중형 아이 */}
          <div css={dogSize} onClick={() => handleDogSizeClick("medium")}>
            {selectedDogSize === "medium" ? (
              <Mdogpink css={{ width: "90px", height: "90px" }} />
            ) : (
              <Mdogwhite css={{ width: "90px", height: "90px" }} />
            )}
            <span
              css={typo.Body2}
              style={{
                color: selectedDogSize === "medium" ? "#000000" : "#8E8E93",
                cursor: "pointer",
                margin: "auto",
              }}
            >
              중형
            </span>
          </div>

          {/* 대형 아이 */}
          <div css={dogSize} onClick={() => handleDogSizeClick("large")}>
            {selectedDogSize === "large" ? (
              <Ldogpink css={{ width: "90px", height: "90px" }} />
            ) : (
              <Ldogwhite css={{ width: "90px", height: "90px" }} />
            )}
            <span
              css={typo.Body2}
              style={{
                color: selectedDogSize === "large" ? "#000000" : "#8E8E93",
                cursor: "pointer",
                margin: "auto",
              }}
            >
              대형
            </span>
          </div>
        </div>
      </div>
      {/* 입장조건 */}
      <div
        css={[
          Block.flexBlock,
          css`
            flex-direction: column;
            gap: 2vh;
          `,
        ]}
      >
        <span css={typo.Heading2}>입장조건</span>
        <div css={conditionStyle}>
          {[
            "입마개는 필수예요 🐾",
            "케이지를 사용했어요 🙏",
            "기저귀를 착용해요 ☁️",
            "리드줄을 착용했어요 〰️",
            "실내 동반이 가능해요 🛋️",
            "테라스 이용만 가능해요 🏕️",
          ].map((condition, index) => (
            <button
              key={index}
              css={
                selectedConditions.includes(condition)
                  ? Button.mainPinkButton({
                      isDisabled: false, // 추가
                      width: "100%",
                      height: "50px",
                    })
                  : Button.grayBorderButton({
                      width: "100%",
                      height: "50px",
                    })
              }
              onClick={() => handleConditionClick(condition)}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>
      {/* 공간시설 */}
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
            "입마개는 필수예요 🐾",
            "케이지를 사용했어요 🙏",
            "기저귀를 착용해요 ☁️",
            "리드줄을 착용했어요 〰️",
            "실내 동반이 가능해요 🛋️",
            "테라스 이용만 가능해요 🏕️",
          ].map((place, index) => (
            <button
              key={index}
              css={
                selectedPlaces.includes(place)
                  ? Button.mainPinkButton({
                      isDisabled: false, // 추가
                      width: "100%",
                      height: "50px",
                    })
                  : Button.grayBorderButton({
                      width: "100%",
                      height: "50px",
                    })
              }
              onClick={() => handlePlaceClick(place)}
            >
              {place}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
