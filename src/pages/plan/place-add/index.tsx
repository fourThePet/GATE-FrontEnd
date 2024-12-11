import { useEffect, useState } from "react";
import { bottomButtonStyle, contentWrapper, headerContainerStyle, searchBarWrapperStyle, searchIconStyle, searchInputStyle, selectionWrapper, tabAreaWrapper, tabItem, tabWrapper, wrapper } from "./index.styles";
import { LoadingBar, MainPinkButton, Text } from "../../../components";
import CategoryList from "../../place/components/category/category-search";
import { useGetFavoritesList, useGetPlacesCategories } from "../../../queries";
import { categoryIcon } from "../../../utils/translations";
import { useLocation, useNavigate } from "react-router-dom";
import { PlaceListCard, SelectionImage } from "../components";
import { FavoritesListType } from "../../../interfaces";
type SelectItem = {
    placeId: number;
    placeName: string;
    photoUrl: string;
    latitude : number;
    longitude: number;
};
export default function PlaceAdd(){
    const navigate = useNavigate();

    //즐겨찾기 데이터
    const {data : myBookmarkList, isLoading: isFavoriteLoading} = useGetFavoritesList(); 
    //카테고리 
    const { data, isLoading :isCategoryLoading } = useGetPlacesCategories();
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

    const { state } = useLocation(); // PlaceAdd에서 전달한 state를 받기
    const initialSelectItems = state?.selectItems || []; // selectItems를 받아옴

    const [selectItems, setSelectItems] = useState<SelectItem[]>(initialSelectItems);

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

    //선택 완료 버튼 이벤트
    const handleSelectionComplete = () =>{
        //선택된 항목들이랑 같이 이전페이지로 넘어가야함
        console.log(selectItems)
        navigate('/plan/create/place-choice', { state: { selectItems }}) 
    }

    if(isCategoryLoading || isFavoriteLoading) {return (<LoadingBar/>)}
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
                            <PlaceListCard 
                            placeId={1}
                            placeName={'더왈츠'} 
                            roadAddress={'서울특별시'}
                            setSelectItems={setSelectItems} 
                            selectItems={selectItems}/>
                        </>
                    )}
                    {activeTab === "favorites" && (
                        <>
                        {myBookmarkList?.map((list : FavoritesListType, index : number)=>(
                            <PlaceListCard 
                            placeName={list.placeName} 
                            roadAddress={list.roadAddress} 
                            placeId={list.placeId} 
                            latitude={list.latitude}
                            longitude={list.longitude}
                            photoUrl={list.photoUrl}
                            reviewNum={list.reviewNum}
                            starAvg={list.starAvg}
                            setSelectItems={setSelectItems}
                            selectItems={selectItems}
                            key={index} />
                        ))}
                        </>
                    )}
                </div>
                <div css={selectionWrapper}>
                    {selectItems?.map((item, index)=>(
                        <SelectionImage  key={index} imageUrl={item.photoUrl} name={item.placeName}/>
                    ))}
                   
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton title="선택완료" onClick={handleSelectionComplete}/>
                </div>
            </div>
        </div>
    )
}