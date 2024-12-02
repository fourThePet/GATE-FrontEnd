import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { Login, Home, Schedule, Mypage, Place, KakaoCallback,  OnboardingUser, OnboardingPet, OnboardingCompletion } from "./pages";
import PlaceList from "./pages/place-list";
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
        path: "schedule",
        element: <Schedule />,
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
      { path: "place/list", element: <PlaceList /> },

      { path: "review/receiptcheck", element: <ReceiptCheck /> },
      { path: "review/writereview", element: <WriteReview /> },
      { path: "review", element: <Review /> },
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
        path: "onboarding/completion",
        element: <OnboardingCompletion />,
      }
    ],
  },
]);
