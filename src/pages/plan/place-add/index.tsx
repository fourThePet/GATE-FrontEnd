import { useCallback, useEffect, useRef, useState } from "react";
import { bottomButtonStyle, contentWrapper, headerContainerStyle, searchBarWrapperStyle, searchIconStyle, searchInputStyle, selectionWrapper, tabAreaWrapper, tabItem, tabWrapper, wrapper } from "./index.styles";
import { LoadingBar, MainPinkButton, Text } from "../../../components";
import CategoryList from "../../place/components/category/category-search";
import { useGetFavoritesList, useGetPlacesCategories, useGetPlacesPlanSearch } from "../../../queries";
import { categoryIcon } from "../../../utils/translations";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PlaceListCard, SelectionImage } from "../components";
import { SelectPlaceType } from "../../../interfaces";
import usePlanStore from "../../../stores/usePlanStore";
import { notify } from "../../../utils/constants";
import colors from "../../../styles/colors";
import { loadingWrapper, noDataText } from "../index.styles";
import usePageMeta from "../../../utils/usePageMeta";
import { CloseIcon } from "../../../assets/svg";

export default function PlaceAdd(){
    usePageMeta("GATE | 일정생성-장소추가", 'GATE 일정생성'); //seo 검색 최적화
    const {cityId, dogSize:size} = usePlanStore()
    const navigate = useNavigate();

    //즐겨찾기 데이터
    const {data : myBookmarkList, isLoading: isFavoriteLoading} = useGetFavoritesList({cityId, size}); 
    //카테고리 
    const { data, isLoading :isCategoryLoading } = useGetPlacesCategories();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const initialSearchTerm = searchParams.get("search") || "";
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [searchQuery, setSearchQuery] = useState("");

    const handleCategoryClick = (category: string) => {
        if (category === "전체") { 
            // 전체 카테고리 클릭 시 초기화
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    // 장소 선택 데이터
    
    const {
        data: placesListData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading : isPlacesLoading,
    } = useGetPlacesPlanSearch({cityId, category:selectedCategory || undefined, query: searchQuery || undefined});

    
    useEffect(() => {
        if (!hasNextPage) {
          console.log("마지막 페이지입니다.");
        }
    }, [hasNextPage]);

    useEffect(() => {
        if(searchQuery !== null){
            fetchNextPage()
        }
       
    }, [searchQuery,fetchNextPage]);

    //탭 전환
    const [activeTab, setActiveTab] = useState<"selection" | "favorites">("selection");
    const handleTabClick = (tab: "selection" | "favorites") =>{
        setActiveTab(tab)
    }

    const { state } = useLocation(); // PlaceAdd에서 전달한 state를 받기
    const initialSelectItems = state?.selectItems || []; // selectItems를 받아옴

    const [selectItems, setSelectItems] = useState<SelectPlaceType[]>(initialSelectItems);

    useEffect(() => {
        if (data && data.isSuccess) {
            const excludedCategories = ["반려동물용품", "미용", "의료"]; // 제외할 카테고리 이름
            const processedCategories = [
                { id: 0, name: "전체", icon: categoryIcon("전체") },
                { id: 0, name: "추천", icon: "✨" },
                ...data.result
                .filter((category: { id: number; name: string }) => 
                    !excludedCategories.includes(category.name) // 제외 카테고리 필터링
                )
                .map((category: { id: number; name: string }) => ({
                    ...category,
                    icon: categoryIcon(category.name),
                })),
            ];
            setCategories(processedCategories);
        } else if (data && !data.isSuccess) {
             console.error(data.message || "카테고리 로드 실패");
        }
    }, [data]);

    useEffect(()=>{
        if(selectItems.length>0 && selectItems.length<=10){
            setIsDisabled(false)
        }else{
            setIsDisabled(true)
        }
    },[selectItems])


    //검색어 입력 이벤트
    const handleSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value
        setSearchTerm(newSearch);
        

    }
    // 키다운 이벤트로 쿼리 스트링 업데이트
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchQuery(searchTerm);
            setSearchParams({ search: searchTerm }); // 쿼리 스트링 업데이트
        }
    };

    const handleInitButtonClick = () => {
        setSearchTerm("")
        setSearchQuery("");
        setSearchParams({})
    };

    //선택 완료 버튼 이벤트
    const handleSelectionComplete = (e: React.MouseEvent<HTMLButtonElement>) =>{
        if(isDisabled){
            e.preventDefault()
            notify({
              type: "warning",
              text: "장소를 하나 이상 선택해주세요"
            })
            return
        }
        //선택된 항목들이랑 같이 이전페이지로 넘어가야함
        navigate('/plan/create/place-choice', { state: { selectItems }}) 
    }

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage(); // 다음 페이지 가져오기
            }else{
                return
            }
        });

        if (node) observer.current.observe(node);
    },[isFetchingNextPage, hasNextPage, fetchNextPage]);
    const placesList = placesListData?.pages.flatMap((page)=> page.content) || [];


    if(isCategoryLoading || isFavoriteLoading || isPlacesLoading) {return (<LoadingBar/>)}
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
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <div css={searchIconStyle} onClick={handleInitButtonClick}>
                                    <CloseIcon width={8}/>
                                </div>
                                </div>
                            </div>
                            <div>
                            <CategoryList
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryClick={handleCategoryClick}
                            />
                            </div>
                            {placesList.length > 0 ? (
                                placesList.map((places, index)=>{
                                    const isLast = index === placesList.length - 1; // 마지막 요소인지 확인
                                    return (
                                      <div key={places.placeId} ref={isLast ? lastElementRef : null}>
                                        <PlaceListCard
                                          placeName={places.placeName}
                                          roadAddress={places.roadAddress}
                                          placeId={places.placeId}
                                          latitude={places.latitude}
                                          longitude={places.longitude}
                                          photoUrl={places.photoUrl}
                                          reviewNum={places.reviewNum}
                                          starAvg={places.starAvg}
                                          setSelectItems={setSelectItems}
                                          selectItems={selectItems}
                                        />
                                      </div>
                                    );
                                  })
                            ) :(
                                <div css={noDataText}>
                                    <Text type="Label1" color={colors.color.Gray1}>
                                        장소 리스트가 없어요
                                    </Text>
                                </div>
                            )}
                        
                            {isFetchingNextPage && (
                                <div css={loadingWrapper}> 
                                    <LoadingBar />

                                </div>
                                
                            )}
                        </>
                    )}
                    {activeTab === "favorites" && (
                        <>
                        {myBookmarkList?.length > 0 ?(

                            myBookmarkList?.map((list : SelectPlaceType, index : number)=>(
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
                            ))
                        ) : (
                            <div css={noDataText}>
                                <Text type="Label1" color={colors.color.Gray1}>
                                    해당 반려견과 함께 할 수 있는 장소가 없어요
                                </Text>
                            </div>
                        )
                        
                        }
                        </>
                    )}
                </div>
                <div css={selectionWrapper(selectItems?.length !== 0)}>
                    {selectItems?.map((item, index)=>(
                        <SelectionImage  
                            key={index} 
                            imageUrl={item.photoUrl} 
                            name={item.placeName} 
                            placeId = {item.placeId}
                            setSelectItems={setSelectItems}
                        />
                    ))}
                   
                </div>
                <div css={bottomButtonStyle}>
                    <MainPinkButton onClick={handleSelectionComplete} isDisabled={isDisabled}>선택완료</MainPinkButton>
                </div>
            </div>
        </div>
    )
}