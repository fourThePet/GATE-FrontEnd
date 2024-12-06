import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import {
  Login,
  Home,
  Plan,
  Mypage,
  Place,
  KakaoCallback,
  OnboardingUser,
  OnboardingPet,
  OnboardingCompletion,
  MyReview,
  NotFound,
  MyBookMark,
  PlanDetail,
} from "./pages";
import FilterPlace from "./pages/place/filter-place";
import PlaceDetail from "./pages/place/place-detail";
import ReceiptCheck from "./pages/review/receipt-check";
import WriteReview from "./pages/review/write-review";
import Review from "./pages/review";
// 라우터 정의
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "place",
        element: <Place />,
      },
      {
        path: "plan",
        element: <Plan />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      { path: "place/detail/:placeId", element: <PlaceDetail /> },
      { path: "place/filter", element: <FilterPlace /> },
      // { path: "place/list", element: <PlaceList /> },

      { path: "review/receipt-check/:placeId", element: <ReceiptCheck /> },
      { path: "review/write/:placeId", element: <WriteReview /> },
      { path: "review/:placeId", element: <Review /> },
      { path: "auth/kakao", element: <KakaoCallback /> },
      {
        path: "onboarding/user",
        element: <OnboardingUser />,
      },
      {
        path: "onboarding/pet",
        element: <OnboardingPet />,
      },
      {
        path: "mypage/pet-register",
        element: <OnboardingPet />,
      },
      {
        path: "onboarding/completion",
        element: <OnboardingCompletion />,
      },
      {
        path: "mypage/review-list",
        element: <MyReview />,
      },
      {
        path: "mypage/bookmark",
        element: <MyBookMark />,
      },
      {
        path: "plan/:planId",
        element: <PlanDetail />,
      },
    ],
  },
]);
