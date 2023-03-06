import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { HiMoon, HiOutlineSun } from "react-icons/hi";
import { grey } from "@ant-design/colors";
import { Avatar, Button, ConfigProvider, Layout, Switch, theme } from "antd";
import { useTheme } from "../../hook/useTheme";
import { createUseStyles } from "react-jss";
import { FaBars } from "react-icons/fa";
import useMyModal from "../../hook/useMyModal";
import MySider from "./MySider";
import { useViewSize } from "../../hook/useDimension";
import SiderBar from "./SiderBar";
import Scrollbars from "react-custom-scrollbars";
import SimpleBar from "simplebar-react";
const { Header, Content, Footer } = Layout;

const useStyle = createUseStyles({
  content: {
    padding: 24,
  },
  header: {
    display: "flex",
    // position: "sticky",
    zIndex: 99,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: ({ headerColor }) => headerColor,
    "&.ant-layout-header": {
      padding: "2px 16px",
      background: ({ headerBackground }) => headerBackground,
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
    },
  },
  menu: {
    background: "none",
    color: "#dadada",
    padding:8,
    "&.ant-menu-dark .ant-menu-item-group-title":{
      color:({ selectedMenuBg }) => selectedMenuBg
    },
    "&.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline": {
      background: "none",
      marginLeft: 8,
    },
    "&.ant-menu-dark  .ant-menu-item-selected": {
      background: ({ selectedMenuBg }) => selectedMenuBg,
      fontWeight: "bold",
      color: ({ menuColor }) => menuColor,
      paddingLeft: 2,
      // margin: 0
      
    },
    "& a":{
      color: "#dadada",

    }
  },
  logo: {
    padding: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    // color: ({ isDark }) => isDark ? "#FFF":"#000",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default function Dashboard({ children, menus, themes }) {
  const [collapsed, setCollapsed] = useState(true);
  const [open, handleOpen, handleClose] = useMyModal(false);
  const isMobile = useViewSize();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {
    siderBg,
    menuColor,
    headerBackground,
    colorPrimary,
    headerColor,
    selectedMenuBg,
    isDark,
    toggleDarkMode,
  } = themes;

  console.log(siderBg);

  const classes = useStyle({
    colorPrimary,
    menuColor,
    siderBg,
    selectedMenuBg,
    colorBgContainer,
    headerColor,
    headerBackground,
    isDark,
  });

  return (
    <Layout className={classes.layout} style={{ height: "100vh" }}>
      {!!open && !!isMobile && (
        <MySider
          open={open}
          classes={classes}
          siderBg={siderBg}
          colorPrimary={colorPrimary}
          handleClose={handleClose}
          menus={menus || []}
          isDark={isDark}
        />
      )}
      {!isMobile && (
        <SiderBar
          classes={classes}
          siderBg={siderBg}
          collapsed={collapsed}
          colorPrimary={colorPrimary}
          menus={menus || []}
          isDark={isDark}
        />
      )}

      <Layout>
        <Header className={classes.header}>
          <div
            className="header-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            {!!collapsed ? (
              <Button
                onClick={() => {
                  !!isMobile ? handleOpen() : setCollapsed(!collapsed);
                }}
                type="link"
                icon={<FaBars color={grey[4]} size={24} className="trigger" />}
              />
            ) : (
              <Button
                type="link"
                onClick={() => {
                  !!isMobile ? handleOpen() : setCollapsed(!collapsed);
                }}
                icon={<FaBars color={grey[4]} size={24} className="trigger" />}
              />
            )}
          </div>

          <div
            className="header-right"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Switch
              checked={isDark}
              onChange={(value) => toggleDarkMode(value)}
              unCheckedChildren={
                <HiOutlineSun
                  size={21}
                  style={{ display: "flex", alignItems: "center" }}
                />
              }
              checkedChildren={
                <HiMoon
                  size={20}
                  style={{ display: "flex", alignItems: "center" }}
                />
              }
            />
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ backgroundColor: colorPrimary }}
            />
          </div>
        </Header>
        {/* <Scrollbars> */}
        <Content >
          <SimpleBar
            style={{ maxHeight: `calc(100vh - 70px)` }}
            // forceVisible="y"
            autoHide={false}
          >
            <div className={classes.content}>{children}</div>
          </SimpleBar>
        </Content>

        {/* </Scrollbars> */}
        {/* <Footer
          style={{
            textAlign: "center",
            background: "red"
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
