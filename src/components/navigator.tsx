import { useNavigate, useLocation } from "react-router-dom";
import {
  Homegray,
  Homepink,
  Mypagegray,
  Mypagepink,
  Schedulegray,
  Schedulepink,
  Communitygray,
  Communitypink,
} from "../assets/svg";
import { Block } from "../components/block/block";
import { typo } from "../styles/typo";
import { LayoutContainer } from "../styles/ui";

// import { useUserId } from "../hooks/useUserId";

type Props = {
  isLoginPage: boolean;
  isPlaceDetailPage: boolean;
  isReceiptCheckPage: boolean;
  isWriteReviewPage: boolean;
};

export default function Navigator({
  isPlaceDetailPage,
  isLoginPage,
  isReceiptCheckPage,
  isWriteReviewPage,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  //   const userId = useUserId();

  const handleNavigation = (path: string) => {
    // 장바구니나 프로필 페이지로 이동하려고 할 때
    //   if ((path === "/cart" || path === "/profile") && !userId) {
    //     // userId가 없으면 (로그인하지 않은 상태) 로그인 페이지로 리다이렉트
    //     alert("로그인이 필요합니다.");
    //     navigate("/login", { state: { from: location.pathname } });
    //     return;
    //   }
    navigate(path);
  };

  const navItems = [
    {
      icon:
        location.pathname === "/home" ? (
          <Homepink width={31} />
        ) : (
          <Homegray width={31} />
        ),
      label: "홈",
      path: "/home",
      requiresAuth: false,
    },
    {
      icon: location.pathname.startsWith("/map") ? (
        <Communitypink width={31} />
      ) : (
        <Communitygray width={31} />
      ),
      label: "지도",
      path: "/map",
      requiresAuth: false,
    },
    {
      icon: location.pathname.startsWith("/schedule") ? (
        <Schedulepink width={31} />
      ) : (
        <Schedulegray width={31} />
      ),
      label: "일정",
      path: "/schedule",
      requiresAuth: false,
    },
    {
      icon: location.pathname.startsWith("/mypage") ? (
        <Mypagepink width={31} />
      ) : (
        <Mypagegray width={31} />
      ),
      label: "마이페이지",
      path: "/mypage",
      requiresAuth: true,
    },
  ];

  return (
    <>
      {!isLoginPage &&
        !isPlaceDetailPage &&
        !isReceiptCheckPage &&
        !isWriteReviewPage && (
          <div css={LayoutContainer.NavContainer}>
            <div css={Block.flexBlock}>
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.path);
                // const isDisabled = item.requiresAuth && !userId;

                return (
                  <div
                    key={index}
                    css={Block.flexBlock({
                      width: "100%",
                      height: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                      direction: "column",
                      gap: "10px",
                      pointer: true,
                    })}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.icon}
                    <span
                      css={typo.Body2}
                      style={{ color: isActive ? "#F1729B" : "#C9CBD4" }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </>
  );
}
