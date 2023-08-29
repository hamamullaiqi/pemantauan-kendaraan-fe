import React, { Fragment, useEffect } from "react";
import { green } from "@ant-design/colors";
import { useDispatch, useSelector } from "react-redux";
import { Routing } from "./routing";
import { Route, Routes } from "react-router-dom";

import Menus from "./menus";
import Dashboard from "../../../components/layout/Dashboard";
import { useLocalTheme } from "../localHook/useLocalTheme";
import { ConfigProvider } from "antd";

const TheRouter = () => {
    const {
        userdata: { role },
    } = useSelector((state) => state.auth);
    const routes = Routing.filter((r) => r.role.includes(role));

    return (
        <Routes>
            {routes.map((route, idx) => (
                <Route
                    key={idx}
                    replace
                    path={route.to}
                    // exact={route.isExact !== false}
                    element={!!route.component && route.component}
                />
            ))}
            <Route path={"/*"} element={<div>Page Not Found</div>} />
        </Routes>
    );
};

export default ({ theme, idx }) => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(loadAirlines());
    //   dispatch(loadAirports());
    // }, []);
    const {
        userdata: { level },
    } = useSelector((state) => state.auth);

    return (
        <Fragment>
            <Dashboard menus={Menus} themes={theme} title="PT SGF">
                <TheRouter />
            </Dashboard>
        </Fragment>
    );
};
