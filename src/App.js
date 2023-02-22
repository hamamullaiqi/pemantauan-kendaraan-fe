import { ConfigProvider } from "antd";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";

import MainRouter from "./contents/MainRouter";


LoadingOverlay.propTypes = undefined;

function App() {
  const { loading } = useSelector((state) => state.apps);
  return (
    
      <LoadingOverlay active={loading} spinner text="Loading">
        <MainRouter />
      </LoadingOverlay>

  );
}

export default App;
