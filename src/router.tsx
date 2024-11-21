import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { Login, Home, Schedule, Mypage, Place } from "./pages";
import PlaceList from "./pages/place-list";
import FilterPlace from "./pages/place/filter-place";
import PlaceDetail from "./pages/place/place-detail";
import ReceiptCheck from "./pages/review/receipt-check";
import WriteReview from "./pages/review/write-review";

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

      {
        path: "place",
        element: <Place />,
      },
      {
        path: "place/list",
        element: <PlaceList />,
      },
      {
        path: "place/filter",
        element: <FilterPlace />,
      },
      { path: "place/detail", element: <PlaceDetail /> },
      { path: "review/receiptcheck", element: <ReceiptCheck /> },
      { path: "review/writereview", element: <WriteReview /> },
    ],
  },
]);
