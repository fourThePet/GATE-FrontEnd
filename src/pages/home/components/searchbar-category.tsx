import React, { useEffect, useState } from "react";
import {
  searchBarWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  categoryItemStyle,
  categoryWrapperStyle,
} from "../index.styles";
import { useNavigate } from "react-router-dom";
import { getPlacesCategories } from "../../../api/places";

export default function SearchbarCategory() {
  const [categories, setCategories] = useState<
    { emoji: string; id: number; label: string }[]
  >([]); // emoji, id, label 포함한 상태
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출하여 카테고리 데이터 가져오기
    const fetchCategories = async () => {
      try {
        const data = await getPlacesCategories();
        // API 데이터에서 name 값을 label로 매핑하고, emoji를 하드코딩하여 추가
        const categoriesData = data.result.map(
          (item: { id: number; name: string }, index: number) => ({
            emoji: getEmojiByIndex(index), // 각 카테고리에 해당하는 이모지를 가져옴
            id: item.id,
            label: item.name, // API에서 응답받은 name 값
          })
        );
        setCategories(categoriesData);
      } catch (error) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  const getEmojiByIndex = (index: number): string => {
    // 카테고리 순서에 따라 이모지를 반환
    const emojis = ["🏥", "✂️", "🦴", "🍴", "☕️", "🏡", "🎨", "🚗"];
    return emojis[index] || "❓"; // 지정된 순서에 없는 경우 기본 이모지 반환
  };

  const handleSearchbarClick = () => {
    console.log("필터 적용 페이지 호출");
    navigate("/place"); // 검색바 클릭 시 페이지 이동
  };

  return (
    <>
      {/* 검색 바 */}
      <div css={searchBarWrapperStyle}>
        <div css={searchIconStyle}>🔍</div>
        <input
          css={searchInputStyle}
          placeholder="어디로 떠나시나요?"
          readOnly
          onClick={handleSearchbarClick}
        />
      </div>
      {/* 카테고리 */}
      <div css={categoryWrapperStyle}>
        {categories.map((item) => (
          <div key={item.id} css={categoryItemStyle}>
            <span style={{ fontSize: "2rem" }}>{item.emoji}</span>{" "}
            {/* 하드코딩된 이모지 */}
            <span>{item.label}</span> {/* API에서 가져온 name 값 */}
          </div>
        ))}
      </div>
    </>
  );
}
