import Filter from "../../../../assets/svg/Filter";
import {
  headerContainerStyle,
  searchBarWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  filterButtonStyle,
} from "./index.styles";

type Props = {
  title?: string;
  handleFilterButtonClick?: () => void;
  handleSearchSubmit: (value: string) => void;
};

export default function SearchFilterHeader({
  handleFilterButtonClick,
  handleSearchSubmit,
}: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      handleSearchSubmit(value);
    }
  };

  return (
    <div css={headerContainerStyle}>
      <div css={searchBarWrapperStyle}>
        <div css={searchIconStyle}>🔍</div>
        <input
          css={searchInputStyle}
          placeholder="어디로 떠나시나요?"
          onKeyPress={handleKeyPress}
        />
      </div>
      <button css={filterButtonStyle} onClick={handleFilterButtonClick}>
        <Filter className="filterIconStyle" />
      </button>
    </div>
  );
}
