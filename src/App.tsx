import { Outlet, useNavigate } from "react-router-dom";
import { Block } from "./styles/ui";
import Navigator from "./components/navigator";
import Header from "./components/header/header";
import { Layout } from "./components";

function App() {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleBellButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <Layout>
        <Header
          handleBackButtonClick={handleBackButtonClick}
          handleBellButtonClick={handleBellButtonClick}
        />
      </Layout>
      <Outlet />
      <Navigator />
    </>
  );
}

export default App;
