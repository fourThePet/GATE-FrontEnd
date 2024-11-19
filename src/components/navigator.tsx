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
import { Block, NavContainer, Text } from "../styles/ui";
// import { useUserId } from "../hooks/useUserId";

type Props = {
  //   isLoginPage: boolean;
  //   isSignupPage: boolean;
  //   isMarketDetailPage: boolean;
  //   isBuyPage: boolean;
  //   isPrivacyPolicyPage: boolean;
  //   isTermsOfUsePage: boolean;
  //   isUnregister1Page: boolean;
  //   isUnregister2Page: boolean;
  //   isCartPage: boolean;
  //   isCatAddPage: boolean;
  //   isPaymentsDetailPage: boolean;
};

export default function Navigator(
  {
    //   isLoginPage,
    //   isSignupPage,
    //   isMarketDetailPage,
    //   isBuyPage,
    //   isPrivacyPolicyPage,
    //   isTermsOfUsePage,
    //   isUnregister1Page,
    //   isUnregister2Page,
    //   isCartPage,
    //   isCatAddPage,
    //   isPaymentsDetailPage,
  }: Props
) {
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
      icon: location.pathname.startsWith("/community") ? (
        <Communitypink width={31} />
      ) : (
        <Communitygray width={31} />
      ),
      label: "커뮤니티",
      path: "/community",
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
      {/* {!isLoginPage &&
        !isSignupPage &&
        !isMarketDetailPage &&
        !isBuyPage &&
        !isPrivacyPolicyPage &&
        !isTermsOfUsePage &&
        !isUnregister1Page &&
        !isUnregister2Page &&
        !isCartPage &&
        !isCatAddPage &&
        !isPaymentsDetailPage && ( */}
      <NavContainer>
        <Block.FlexBox>
          {navItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            // const isDisabled = item.requiresAuth && !userId;

            return (
              <Block.FlexBox
                key={index}
                width="100%"
                height="100px"
                justifyContent="center"
                alignItems="center"
                direction="column"
                gap="10px"
                pointer
                onClick={() => handleNavigation(item.path)}
                // style={{
                //   opacity: isDisabled ? 0.5 : 1,
                //   cursor: isDisabled ? "default" : "pointer",
                // }}
              >
                {item.icon}
                <Text.Notice200
                  style={{ color: isActive ? "#F1729B" : "#C9CBD4" }}
                >
                  {item.label}
                </Text.Notice200>
              </Block.FlexBox>
            );
          })}
        </Block.FlexBox>
      </NavContainer>
      {/* )} */}
    </>
  );
}
