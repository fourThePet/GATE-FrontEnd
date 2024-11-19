import { useLocation, matchPath } from "react-router-dom";
import LogoBellHeader from "./logo-bell";
import OnlyTitleHeader from "./only-title";

type HeaderComponentProps = {
  title?: string; // title은 선택적 속성으로 설정
  handleBackButtonClick?: () => void; // 선택적으로 받을 수 있음
  handleBellButtonClick: () => void;
};

type Props = {
  handleBackButtonClick: () => void;
  handleBellButtonClick: () => void;
};

export default function Header({
  handleBackButtonClick,
  handleBellButtonClick,
}: Props) {
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
    { path: "/community", title: "커뮤니티", component: OnlyTitleHeader },
    // { path: "/schedule", title: "일정", component: OnlyTitleHeader },
    { path: "/mypage", title: "마이페이지", component: OnlyTitleHeader },
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
      handleBellButtonClick={handleBellButtonClick}
    />
  );
}
