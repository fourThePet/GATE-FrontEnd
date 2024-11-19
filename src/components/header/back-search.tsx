import { HeaderBackArrow } from "../../assets/svg";
import { HeaderContainer } from "../../styles/ui";
import styled from "styled-components";

type Props = {
  title?: string;
  handleBackButtonClick: () => void;
  handleSearchSubmit: (value: string) => void;
};

export default function BackSearchHeader({
  handleBackButtonClick,
  handleSearchSubmit,
}: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      handleSearchSubmit(value);
    }
  };

  return (
    <HeaderContainer>
      {/* 뒤로가기 버튼 */}
      <HeaderBackArrow
        width={24}
        onClick={handleBackButtonClick}
        cursor="pointer"
      />
      {/* 검색바 */}
      <SearchBarWrapper>
        <SearchInput
          placeholder="어디로 떠나시나요?"
          onKeyPress={handleKeyPress}
        />
        <SearchIcon>🔍</SearchIcon> {/* 검색 아이콘 */}
      </SearchBarWrapper>
    </HeaderContainer>
  );
}

// 스타일 컴포넌트
const SearchBarWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 12px;
  margin: 0 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  ::placeholder {
    color: #bbb;
  }
`;

const SearchIcon = styled.div`
  color: #bbb;
  font-size: 16px;
  cursor: pointer;
`;
