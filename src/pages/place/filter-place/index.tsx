import { useNavigate } from "react-router-dom";
import BackTitleHeader from "../../../components/header/back-title";
import FilterSection from "./filter-list";
import { headerContainer } from "../../../components/header/back-search";
import { Block } from "../../../components/block/block";
import { css } from "@emotion/react";
import { Button } from "../../../components/button/button";
import colors from "../../../styles/colors";
import { useState } from "react";

export default function FilterPlace() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({}); // 선택된 필터 값을 관리하는 상태

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleReset = () => {
    setFilters({}); // 필터 값 초기화
    navigate("/place"); // /place로 리다이렉션
  };

  const handleApply = () => {
    console.log("적용된 필터 값:", filters); // 콘솔에 선택된 필터 값 출력
    navigate("/place", { state: { filters } }); // /place 페이지로 값 전달
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
        <FilterSection setFilters={setFilters} /> {/* 필터 상태 전달 */}
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
