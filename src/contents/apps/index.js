import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { initMe, setApps } from "../../redux/reducer/auth";

import LoginPage from "../auth/Login";
import DashboardPages from "./pages";
import SplashPage from "../../splash";
import { ConfigProvider } from "antd";
import { useLocalTheme } from "./localHook/useLocalTheme";

const UserPage = ({ userdata, theme }) => {
  return (
    <Routes>
      <Route
        path=""
        element={
          (!!userdata && <Navigate to={"home"} />) || <Navigate to="login" />
        }
      />
      <Route
        exact
        path="login"
        element={
          (!!userdata && <Navigate to={"home"} />) || (
            <LoginPage apps={"Apps"} theme={theme} />
          )
        }
      />

      <Route
        path="*"
        element={
          (!!userdata && <DashboardPages idx={new Date().getTime()} />) || (
            <Navigate to="login" />
          )
        }
      />
    </Routes>
  );
};

export default () => {
  const theme = useLocalTheme({appName:'apps'});
  const { userdata, initComplete } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setApps("head-office")); // set applikasi
    dispatch(initMe()); // cek token validasi
  }, [initMe, setApps]);
  if (!initComplete) return <SplashPage />;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.algorithm,
        token: {
          colorPrimary: theme.colorPrimary,
          borderRadius: 4,
        },
      }}
    >
      <UserPage userdata={userdata} theme={theme} />
    </ConfigProvider>
  );
};
