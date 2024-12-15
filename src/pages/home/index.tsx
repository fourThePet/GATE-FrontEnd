// Home.jsx
import { PageWrapper } from "../../styles/ui";
import SearchbarCategory from "./components/searchbar-category";
import TodayBenefit from "./components/today-benefit";
import Best10 from "./components/Best10";

export default function Home() {
  return (
    <>
      <div
        css={PageWrapper}
        style={{
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          marginTop: "50px",
          position: "relative",
          marginBottom: "80px",
        }}
      >
        {" "}
        <style>
          {`
        div::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
        }
      `}
        </style>
        <SearchbarCategory />
        <TodayBenefit />
        <Best10 />
      </div>
    </>
  );
}
