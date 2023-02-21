import React from "react";
import { Avatar, Layout, Menu } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";
import { Menus } from "../menus";
const { Sider } = Layout;

export default function SiderBar({ collapsed, classes, siderBg, colorPrimary,  ...props }) {
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
          style={{ backgroundColor: siderBg, height:"100vh" }}
        >
          <div className={classes.logo}>
            <Avatar
              icon={<SafetyCertificateFilled style={{ color: colorPrimary }} />}
              style={{ backgroundColor: "white" }}
            />
            <p>WHITESPACE</p>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            className={classes.menu}
            defaultSelectedKeys={["4"]}
            items={Menus || []}
          />
        </Sider>
  );
}
