import {
  headerContainerStyle,
  searchBarWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  filterWrapperStyle,
} from "./index.styles";

type Props = {
  title?: string;
  handleFilterButtonClick: () => void;
  handleSearchSubmit: (value: string) => void;
};

export default function SearchFilterHeader({
  handleSearchSubmit,
  handleFilterButtonClick,
}: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      handleSearchSubmit(value);
    }
  };

  return (
    <div css={headerContainerStyle}>
      {/* 검색바 */}
      <div css={searchBarWrapperStyle}>
        <div css={searchIconStyle}>🔍</div> {/* 검색 아이콘 */}
        <input
          css={searchInputStyle}
          placeholder="어디로 떠나시나요?"
          onKeyPress={handleKeyPress}
        />
      </div>
      <div css={filterWrapperStyle} onClick={handleFilterButtonClick} />
    </div>
  );
}
