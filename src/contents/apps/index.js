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
import { ConfigProvider } from "antd";
import { useLocalTheme } from "./localHook/useLocalTheme";
import { setTheme } from "../../redux/reducer/apps";

const defaultNavigateUser = (role) => {
    console.log(role);
    switch (role) {
        case "MNG":
            return <Navigate replace to="laporan/kendaraan-masuk" />;
        case "ADM":
            return <Navigate replace to="/apps/home" />;

        default:
            return;
    }
};

const UserPage = ({ userdata, theme }) => {
    console.log(userdata);
    return (
        <Routes>
            <Route
                path=""
                element={
                    !!userdata ? (
                        defaultNavigateUser(userdata?.role)
                    ) : (
                        <Navigate replace to="/apps/home/login" />
                    )
                }
            />
            <Route
                exact
                path="login"
                element={
                    !!userdata ? (
                        defaultNavigateUser(userdata?.role)
                    ) : (
                        <LoginPage apps="Dashboard" theme={theme} />
                    )
                }
            />

            <Route
                path="*"
                element={
                    !!userdata ? (
                        <DashboardPages
                            theme={theme}
                            idx={new Date().getTime()}
                        />
                    ) : (
                        <Navigate replace to="/" />
                    )
                }
            />
        </Routes>
    );
};

export default () => {
    const theme = useLocalTheme({ appName: "apps" });
    const { userdata, initComplete } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setApps("head-office")); // set applikasi
        dispatch(initMe()); // cek token validasi
        dispatch(setTheme(!!theme.isDark ? "dark" : "light"));
    }, [initMe, setApps]);
    if (!initComplete) return <p>Loading ...</p>;

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.algorithm,
                token: {
                    colorPrimary: theme.colorPrimary,
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: `'Inter', sans-serif`,
                },
            }}
        >
            <UserPage userdata={userdata} theme={theme} />
        </ConfigProvider>
    );
};
