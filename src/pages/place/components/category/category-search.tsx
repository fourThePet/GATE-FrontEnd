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
          onClick={() => onCategoryClick(category.name)}
        >
          <div css={categoryButtonStyle}>
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
