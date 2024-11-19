import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./pages/home";
import Community from "./pages/community";
import Schedule from "./pages/schedule";
import Mypage from "./pages/mypage";

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
        path: "community",
        element: <Community />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
    ],
  },
]);
