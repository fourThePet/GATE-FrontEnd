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
  isOnboardingPage : boolean
};

export default function Navigator({
  isLoginPage,
  isPlaceDetailPage,
  isReceiptCheckPage,
  isWriteReviewPage,
  isOnboardingPage
  
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
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
      icon: location.pathname.startsWith("/place") ? (
        <Communitypink width={31} />
      ) : (
        <Communitygray width={31} />
      ),
      label: "장소",
      path: "/place",
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

  // place/detail에서는 네비게이션을 숨김
  const isPlaceDetailPath = location.pathname === "/place/detail/";

  return (
    <>
      {!isLoginPage &&
        !isOnboardingPage &&
        !isPlaceDetailPage &&
        !isReceiptCheckPage &&
        !isWriteReviewPage &&
        !isPlaceDetailPath && (
          <div css={LayoutContainer.NavContainer}>
            <div css={Block.flexBlock}>
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.path);

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
