import {
  categoryContainerStyle,
  categoryItemStyle,
  categoryButtonStyle,
} from "../search-bar/index.styles";

type Category = {
  id: number;
  name: string;
  icon?: string;
};

type CategoryListProps = {
  categories: Category[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
};

export default function CategoryList({
  categories,
  selectedCategory,
  onCategoryClick,
}: CategoryListProps) {
  return (
    <div css={categoryContainerStyle}>
      {categories.map((category) => {
        // 현재 선택된 Category인지 여부
        const isActive = category.name === selectedCategory;

        return (
          <button
            key={category.id}
            css={categoryItemStyle}
            // 선택된 카테고리라면 active class 추가
            className={isActive ? "active" : ""}
            onClick={() => onCategoryClick(category.name)}
          >
            <div css={categoryButtonStyle}>
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
