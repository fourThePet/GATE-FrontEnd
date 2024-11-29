import axios from "axios";
import { useEffect, useState } from "react";

const getCategoryIcon = (name) => {
  const iconMap = {
    식당: "🍴",
    카페: "☕",
    의료: "🏥",
    반려동물용품: "🦴",
    미용: "✂️",
    숙소: "🏡",
    문화시설: "🎨",
    여행지: "🚙",
  };
  return iconMap[name] || "🐾";
};

export default function getPlacesCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await axios
          .get(`${import.meta.env.VITE_BASE_URL}/places/categories`)
          .then((res) => res.data);

        if (data.isSuccess) {
          const categorieIcons = [
            { id: 0, name: "전체", icon: getCategoryIcon("전체") },
            ...data.result.map((category) => ({
              ...category,
              icon: getCategoryIcon(category.name),
            })),
          ];
          setCategories(categorieIcons);
        } else {
          setError(data.message || "카테고리 로드 실패");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
