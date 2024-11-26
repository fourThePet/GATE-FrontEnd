import { HeaderBackArrow } from "../../assets/svg";
import { css } from "@emotion/react";
import colors from "../../styles/colors";

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
    <div css={headerContainer}>
      <HeaderBackArrow
        css={backArrow}
        width={24}
        onClick={handleBackButtonClick}
        cursor="pointer"
      />
      <div css={searchBarWrapper}>
        <div css={searchIcon}>🔍</div>
        <input
          css={searchInput}
          placeholder="어디로 떠나시나요?"
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export const headerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100px;
`;

export const searchBarWrapper = css`
  flex: 1;
  display: flex;
  background: ${colors.color.Gray6};
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  margin: 20px 30px 0 0;
  height: 50%;
  width: 80%;
`;

export const searchInput = css`
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: ${colors.color.Black};
  ::placeholder {
    color: ${colors.color.Gray3};
  }
`;

export const searchIcon = css`
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
`;

export const backArrow = css`
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  width: 17%;
  height: 50%;
`;
