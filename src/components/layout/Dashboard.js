import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { HiMoon, HiOutlineSun } from "react-icons/hi";
import { grey } from "@ant-design/colors";
import {
  Avatar,
  Button,
  ConfigProvider,
  Layout,
  Switch,
  theme,
} from "antd";
import { useTheme } from "../../hook/useTheme";
import { createUseStyles } from "react-jss";
import { FaBars } from "react-icons/fa";
import useMyModal from "../../hook/useMyModal";
import MySider from "./MySider";
import { useViewSize } from "../../hook/useDimension";
import SiderBar from "./SiderBar";
const { Header, Content, Footer } = Layout;

const useStyle = createUseStyles({
  content: {
    padding: 24,
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: ({ headerColor }) => headerColor,
    "&.ant-layout-header": {
      padding: "2px 16px",
      background: ({ headerBackground }) => headerBackground,
    },
  },
  menu: {
    backgroundColor: ({ siderBg }) => siderBg,
    color: "#bdbdbd",
    "&.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline": {
      background: ({ siderBg }) => siderBg,
      marginLeft: 8,
    },
    "&.ant-menu-dark .ant-menu-item-selected": {
      background: ({ selectedMenuBg }) => selectedMenuBg,
      fontWeight: "bold",
      color: ({ menuColor }) => menuColor,
    },
  },
  logo: {
    padding: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: ({ menuColor }) => menuColor,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default function Dashboard({children, menus}) {
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
  } = useTheme();

  const classes = useStyle({
    colorPrimary,
    menuColor,
    siderBg,
    selectedMenuBg,
    colorBgContainer,
    headerColor,
    headerBackground,
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
          />
        )}
        {!isMobile && (
          <SiderBar
            classes={classes}
            siderBg={siderBg}
            collapsed={collapsed}
            colorPrimary={colorPrimary}
            menus={menus || []}

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
                  icon={
                    <FaBars color={grey[4]} size={24} className="trigger" />
                  }
                />
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    !!isMobile ? handleOpen() : setCollapsed(!collapsed);
                  }}
                  icon={
                    <FaBars color={grey[4]} size={24} className="trigger" />
                  }
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
          <Content>
            <div className={classes.content}>{children}</div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
  );
}
