import Filter from "../../../../assets/svg/Filter";
import {
  headerContainerStyle,
  searchBarWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  filterButtonStyle,
} from "./index.styles";

type Props = {
  handleFilterButtonClick?: () => void;
  handleSearchSubmit: (value: string) => void;
  initialQuery: string; // 초기 검색어 추가
};

export default function SearchFilterHeader({
  handleFilterButtonClick,
  handleSearchSubmit,
  initialQuery,
}: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      handleSearchSubmit(value);
    }
  };

  const clickSearchIcon = () => {
    const inputElement = document.querySelector(
      "input[placeholder='어디로 떠나시나요?']"
    ) as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      handleSearchSubmit(value);
    }
  };

  return (
    <div css={headerContainerStyle}>
      <div css={searchBarWrapperStyle}>
        <div css={searchIconStyle} onClick={clickSearchIcon}>
          🔍
        </div>
        <input
          css={searchInputStyle}
          placeholder="어디로 떠나시나요?"
          defaultValue={initialQuery} // URL의 query 값 유지
          onKeyPress={handleKeyPress}
        />
      </div>
      <button css={filterButtonStyle} onClick={handleFilterButtonClick}>
        <Filter className="filterIconStyle" width={48}/>
      </button>
    </div>
  );
}
