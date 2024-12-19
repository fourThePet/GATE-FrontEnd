// Home.jsx
import { PageWrapper } from "../../styles/ui";
import SearchbarCategory from "./components/searchbar-category";
import TodayBenefit from "./components/today-benefit";
import Best10 from "./components/Best10";
import { useEffect, useState } from "react";
import { LoadingBar, PetRegistrationModal } from "../../components";
import { useAuthStore } from "../../stores/useAuthStore";
import { useGetDogsProfiles } from "../../queries";
import usePageMeta from "../../utils/usePageMeta";
import { useLocationStore } from "../../stores/useLocationState";
export default function Home() {
  usePageMeta("GATE | 홈", "GATE 홈화면"); //seo 검색 최적화
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAuthStore();
  const { data: dogs, isLoading } = useGetDogsProfiles(); // 데이터 로딩 중 undefined 유지
  const { setLatitude, setLongitude, setCurLatitude, setCurLongitude } =
    useLocationStore();

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      if (dogs?.length === 0) {
        setIsModalOpen(true); // 반려동물이 없을 때 모달 열기
      } else {
        setIsModalOpen(false); // 반려동물이 있을 때 모달 닫기
      }
    } else if (!isLoggedIn) {
      setIsModalOpen(false); // 로그아웃 상태에서는 모달 닫기
    }
  }, [isLoggedIn, dogs, isLoading]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLatitude(latitude);
        setLongitude(longitude);
        setCurLatitude(latitude);
        setCurLongitude(longitude);
        console.log("위치 저장됨:", latitude, longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("위치 정보 접근 권한이 거부되었습니다.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("위치 정보를 사용할 수 없습니다.");
            break;
          case error.TIMEOUT:
            console.error("위치 정보를 가져오는 시간이 초과되었습니다.");
            break;
          default:
            console.error("알 수 없는 오류가 발생했습니다.");
            break;
        }
        setLatitude(37.5642135);
        setLongitude(127.0016985);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [setLatitude, setLongitude]);

  if (isLoading) {
    return <LoadingBar />;
  }
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
        {isModalOpen && (
          <PetRegistrationModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
      </div>
    </>
  );
}
