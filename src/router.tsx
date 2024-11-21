import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { Login, Home, Schedule, Mypage } from "./pages";

import PlaceDetail from "./pages/place-detail";
import Map from "./pages/map";
import ReceiptCheck from "./pages/review/receipt-check";
import WriteReview from "./pages/review";

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
        path: "map",
        element: <Map />,
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
      { path: "placedetail", element: <PlaceDetail /> },
      { path: "receiptcheck", element: <ReceiptCheck /> },
      { path: "writereview", element: <WriteReview /> },
    ],
  },
]);
