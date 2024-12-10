import { useLocation, matchPath } from "react-router-dom";
import LogoBellHeader from "./logo-bell";
// import OnlyTitleHeader from "./only-title";
import BackTitleHeader from "./back-title";
import PinkBackHeader from "./pink-back";
import CloseHeader from "./close";

type HeaderComponentProps = {
  title?: string; // title은 선택적 속성으로 설정
  handleBackButtonClick?: () => void; // 선택적으로 받을 수 있음
};

type Props = {
  handleBackButtonClick: () => void;
};

export default function Header({ handleBackButtonClick }: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  // 페이지 데이터 설정
  const pageData: {
    path: string;
    title?: string;
    component: React.ComponentType<HeaderComponentProps>;
  }[] = [
    { path: "", component: LogoBellHeader }, // title 없음
    { path: "/home", component: LogoBellHeader }, // title 없음
    // { path: "/place", title: "장소", component: OnlyTitleHeader },
    // { path: "/mypage", title: "마이페이지", component: OnlyTitleHeader },
    { path: "/login", title: "로그인", component: BackTitleHeader },
    {
      path: "review/receipt-check/:placeId",
      title: "",
      component: BackTitleHeader,
    },
    {
      path: "review/write/:placeId",
      title: "",
      component: BackTitleHeader,
    },
    { path: "/review/:placeId", title: "리뷰", component: BackTitleHeader },
    { path: "/onboarding/user", title: "회원가입", component: BackTitleHeader },
    {
      path: "/onboarding/pet",
      title: "반려동물 프로필 설정",
      component: BackTitleHeader,
    },
    {
      path: "/mypage/pet-register",
      title: "반려동물 프로필 설정",
      component: BackTitleHeader,
    },
    {
      path: "/mypage/review-list",
      title: "내 리뷰내역",
      component: BackTitleHeader,
    },
    {
      path: "/mypage/bookmark",
      title: "내 즐겨찾기",
      component: BackTitleHeader,
    },
    {
      path: "/plan/detail/:planId",
      component: PinkBackHeader,
    },
    {
      path: "/plan/create",
      title: "",
      component: PinkBackHeader,
    },
    {
      path: "/review/edit/:reviewId",
      title: "리뷰 수정",
      component: BackTitleHeader,
    },
    {
      path: "/plan/recommend",
      component: CloseHeader,
    },
    {
      path: "/plan/create/pet-choice",
      title: "",
      component: BackTitleHeader,
    },
  ];

  // 현재 경로에 맞는 페이지 데이터 찾기
  const currentPage = pageData.find((page) =>
    matchPath(page.path, currentPath)
  );

  // 경로가 일치하지 않으면 null 반환
  if (!currentPage) {
    return null;
  }

  const { component: HeaderComponent, title } = currentPage;

  // `HeaderComponent`에 필요한 props 전달
  return (
    <HeaderComponent
      title={title} // title이 선택적이므로 문제 없음
      handleBackButtonClick={handleBackButtonClick}
    />
  );
}
