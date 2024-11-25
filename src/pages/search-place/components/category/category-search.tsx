import {
  categoryContainerStyle,
  categoryItemStyle,
  categoryButtonStyle,
} from "../search-bar/index.styles";

type Category = {
  id: number;
  label: string;
  icon: string;
};

type CategoryListProps = {
  categories: Category[];
  onCategoryClick: (category: string) => void;
};

export default function CategoryList({
  categories,
  onCategoryClick,
}: CategoryListProps) {
  return (
    <div css={categoryContainerStyle}>
      {categories.map((category) => (
        <button
          key={category.id}
          css={categoryItemStyle}
          onClick={() => onCategoryClick(category.label)}
        >
          <div css={categoryButtonStyle}>
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
