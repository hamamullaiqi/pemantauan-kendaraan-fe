import React, { useEffect } from "react";
import { green } from "@ant-design/colors";
import { useDispatch, useSelector } from "react-redux";
import { Routing } from "./routing";
import { Route, Routes } from "react-router-dom";

import { Menus } from "./menus";
import { loadAirlines, loadAirports } from "../../../redux";
import { useLocHref } from "../../../hook/useLocHref";
import { useMenu } from "../../../hook/useMenu";
import { useNavs } from "../../../hook/useNavs";
import Dashboard from "../../../components/layout/Dashboard";
import { useLocalTheme } from "../localHook/useLocalTheme";
import { ConfigProvider } from "antd";

const TheRouter = () => {
  const {
    userdata: { level },
  } = useSelector((state) => state.auth);
  const routes = Routing.filter((r) => (r.level & level) > 0);

  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route
          key={idx}
          path={route.to}
          exact={route.isExact !== false}
          element={(props) => {
            return !!route.component && route.component;
          }}
        />
      ))}
      <Route path={"/*"}>
        <div>Page Not Found</div>
      </Route>
    </Routes>
  );
};

export default ({ idx }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAirlines());
    dispatch(loadAirports());
  }, []);
  const {
    userdata: { level },
  } = useSelector((state) => state.auth);
  const key = useLocHref("dashboard");
  const { keys, menus } = useMenu(Menus, level);
  useNavs(keys, key);

  return (
    
      <Dashboard menus={menus}>
        <TheRouter />
      </Dashboard>
  );
};
