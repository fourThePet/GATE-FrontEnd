import { useEffect, useState } from "react";
import { bottomButtonStyle, contentWrapper, headerContainerStyle, searchBarWrapperStyle, searchIconStyle, searchInputStyle, tabAreaWrapper, tabItem, tabWrapper, wrapper } from "./index.styles";
import { MainPinkButton, Text } from "../../../components";
import CategoryList from "../../place/components/category/category-search";
import { useGetPlacesCategories } from "../../../queries";
import { categoryIcon } from "../../../utils/translations";
import { useNavigate } from "react-router-dom";
import { PlaceListCard } from "../components";

export default function PlaceAdd(){
    const navigate = useNavigate()
    //카테고리 
    const { data } = useGetPlacesCategories();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(data);
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    //탭 전환
    const [activeTab, setActiveTab] = useState<"selection" | "favorites">("selection");
    const handleTabClick = (tab: "selection" | "favorites") =>{
        setActiveTab(tab)
    }

    useEffect(() => {
        if (data && data.isSuccess) {
          const processedCategories = [
            { id: 0, name: "추천", icon: categoryIcon("전체") },
            ...data.result.map((category: { id: number; name: string }) => ({
              ...category,
              icon: categoryIcon(category.name),
            })),
          ];
          setCategories(processedCategories);
        } else if (data && !data.isSuccess) {
          console.error(data.message || "카테고리 로드 실패");
        }
    }, [data]);

    const handleSelectionComplete = () =>{
        //선택된 항목들이랑 같이 이전페이지로 넘어가야함
        navigate(-1) 
    }
    return(
        <div css={contentWrapper}>
            <div css={wrapper}>
                <div css={tabWrapper}>
                    <div css={tabItem("selection", activeTab)} onClick={()=>handleTabClick("selection")}>
                        <Text type="Body2">장소 선택</Text>
                    </div>
                    <div css={tabItem("favorites", activeTab)} onClick={()=>handleTabClick("favorites")}>
                        <Text type="Body2">즐겨찾는 장소</Text>
                    </div>
                </div>
                <div css={tabAreaWrapper}>
                    {activeTab === "selection" && (
                        <>
                            <div css={headerContainerStyle}>
                                <div css={searchBarWrapperStyle}>
                                <input
                                    css={searchInputStyle}
                                    placeholder="장소명을 입력하세요"
                                />
                                <div css={searchIconStyle}>🔍</div>
                                </div>
                            </div>
                            <div>
                            <CategoryList
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryClick={handleCategoryClick}
                            />
                            </div>
                            <PlaceListCard/>
                            
                        </>
                    )
                    }
                    {activeTab === "favorites" && (
                        <>
                            <PlaceListCard/>
                        </>
                    )

                    }
                </div>
                <div>
                    선택된 항목들
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton title="선택완료" onClick={handleSelectionComplete}/>
                </div>
            </div>
        </div>
    )
}