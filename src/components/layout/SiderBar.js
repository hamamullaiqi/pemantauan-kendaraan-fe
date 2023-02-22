import React, { useMemo } from "react";
import { Avatar, Layout, Menu } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenKeys, setSelectedMenu } from "../../redux";
import Scrollbars from "react-custom-scrollbars";
const { Sider } = Layout;

export default function SiderBar({
  collapsed,
  classes,
  siderBg,
  colorPrimary,
  menus,
  ...props
}) {
  const { selectedMenu, openKeys } = useSelector((state) => state.nav);
  const { userdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const rootSubmenuKeys = useMemo(() => {
    return menus.map(({ key }) => key);
  }, [menus]);
  return (
    <Sider
      {...props}
      collapsed={collapsed}
      collapsible
      // collapsible
      trigger={null}
      breakpoint="xs"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width={260}
      style={{ backgroundColor: siderBg, height: "100vh" }}
    >
      <div className={classes.logo}>
        <Avatar
          icon={<SafetyCertificateFilled style={{ color: colorPrimary }} />}
          style={{ backgroundColor: "white" }}
        />
        <p>WHITESPACE</p>
      </div>
      <Scrollbars>
        <Menu
          theme="dark"
          mode="inline"
          className={classes.menu}
          items={menus || []}
          onClick={(e) => {
            dispatch(setSelectedMenu(e.key));
          }}
          selectedKeys={[selectedMenu]}
          openKeys={openKeys}
          onOpenChange={(keys) => {
            const latestOpenKey = keys.find(
              (key) => openKeys.indexOf(key) === -1
            );
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
              dispatch(setOpenKeys(keys));
            } else {
              dispatch(setOpenKeys(latestOpenKey ? [latestOpenKey] : []));
            }
          }}
        />
      </Scrollbars>
    </Sider>
  );
}
