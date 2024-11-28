// Home.jsx
import { PageWrapper } from "../../styles/ui";
import SearchbarCategory from "./components/searchbar-category";

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
          marginTop: "60px",
          position: "relative",
        }}
      >
        <SearchbarCategory />
      </div>
    </>
  );
}
