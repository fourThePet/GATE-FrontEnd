// Home.jsx
import { PageWrapper } from "../../styles/ui";
import SearchbarCategory from "./components/searchbar-category";
import TodayBenefit from "./components/today-benefit";
import Best10 from "./components/Best10";
import { useEffect, useState } from "react";
import { PetRegistrationModal } from "../../components";
import { useAuthStore } from "../../stores/useAuthStore";
import { useGetDogsProfiles } from "../../queries";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { isLoggedIn } = useAuthStore();
  const {data , isLoading} = useGetDogsProfiles()
  const dogs = data?.length 

  useEffect(()=>{
    if(!isLoading && isLoggedIn && dogs === 0){
      setIsModalOpen(true)
    }
  },[isLoading, isLoggedIn, dogs])
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
