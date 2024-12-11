// Home.jsx
import { PageWrapper } from "../../styles/ui";
import SearchbarCategory from "./components/searchbar-category";
import TodayBenefit from "./components/today-benefit";
import Best10 from "./components/Best10";
import { useEffect, useState } from "react";
import { LoadingBar, PetRegistrationModal } from "../../components";
import { useAuthStore } from "../../stores/useAuthStore";
import { useGetDogsProfiles } from "../../queries";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { isLoggedIn } = useAuthStore();
  const { data: dogs, isLoading } = useGetDogsProfiles(); // 데이터 로딩 중 undefined 유지

  useEffect(()=>{
    if (isLoggedIn && !isLoading) {
      if (dogs?.length === 0) {
          setIsModalOpen(true); // 반려동물이 없을 때 모달 열기
      } else {
          setIsModalOpen(false); // 반려동물이 있을 때 모달 닫기
      }
    } else if (!isLoggedIn) {
        setIsModalOpen(false); // 로그아웃 상태에서는 모달 닫기
    }
  },[isLoggedIn, dogs, isLoading])

  if(isLoading) { return (<LoadingBar/>)}
  return (
    <>
      <div
        css={PageWrapper}
        style={{
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          marginTop: "50px",
          position: "relative",
          marginBottom: "80px",
        }}
      >
        {" "}
        <style>
          {`
        div::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
        }
      `}
        </style>
        <SearchbarCategory />
        <TodayBenefit />
        <Best10 />
        {isModalOpen && (<PetRegistrationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>)}
      </div>
    </>
  );
}
