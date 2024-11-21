import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { Login, Home, Schedule, Mypage } from "./pages";

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
    ],
  },
]);
