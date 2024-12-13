import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // router를 별도로 export한 파일로 연결
import GlobalStyle from "./styles/global-style";
import { Layout } from "./components";
import QueryProvider from "./provider/query-provider";
import { initSentry } from "../sentry";

initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Layout>
        <GlobalStyle />å
        <RouterProvider router={router} />
      </Layout>
    </QueryProvider>
  </React.StrictMode>
);
