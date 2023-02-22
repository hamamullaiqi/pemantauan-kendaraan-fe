import { ConfigProvider } from "antd";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";

import MainRouter from "./contents/MainRouter";
import { useTheme } from "./hook/useTheme";

LoadingOverlay.propTypes = undefined;

function App() {
  const { loading } = useSelector((state) => state.apps);
  const {colorPrimary,algorithm} = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary,
          borderRadius: 4,
        },
      }}
    >
      <LoadingOverlay active={loading} spinner text="Loading">
        <MainRouter />
      </LoadingOverlay>
    </ConfigProvider>
  );
}

export default App;
