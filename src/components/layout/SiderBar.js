import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenKeys, setSelectedMenu } from "../../redux";
import Scrollbars from "react-custom-scrollbars";
import SimpleBar from "simplebar-react";
import Logo from "../../assets/img/logoptsgf.png";

const { Sider } = Layout;

export default function SiderBar({
  collapsed,
  classes,
  siderBg,
  colorPrimary,
  menus,
  isDark,
  ...props
}) {
  const ref = useRef();
  const [heightSideTop, setHeightSideTop] = useState(0);
  const { selectedMenu, openKeys } = useSelector((state) => state.nav);
  const { userdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState({});
  const [currentOpenMenu, setCurrentOpenMenu] = useState({});

  const rootSubmenuKeys = useMemo(() => {
    return menus?.map(({ key }) => key);
  }, [menus]);

  useEffect(() => {
    setHeightSideTop(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    let result = {};
    let toOpen = {};
    if (Array.isArray(menus)) {
      for (let iii = 0; iii < menus.length; iii++) {
        const el = menus[iii];
        if (!!el?.children && Array.isArray(el?.children)) {
          for (let iv = 0; iv < el.children.length; iv++) {
            const elChildren = el.children[iv];
            if (elChildren.key === window.location.pathname) {
              result = elChildren;
              toOpen = el;
            }
          }
        } else {
          if (el.key === window.location.pathname) {
            result = el;
            toOpen = el;
          }
        }
      }
    }
    setCurrent(result);
    setCurrentOpenMenu(toOpen);
  }, []);

  // console.log(current, currentOpenMenu, menus);

  return (
    <Sider
      {...props}
      collapsed={collapsed}
      collapsible
      // collapsible
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width={"18%"}
      // style={{}}
      style={{
        background: siderBg,
        height: "100vh",
        borderRight: !!isDark && "1px solid #3d3d3d",
      }}
    >
      <div ref={ref}>
        <div className={classes.logo}>
          <img
            src={Logo}
            width={100}
            height={55}
            margin={10}
            icon={<SafetyCertificateFilled style={{ color: colorPrimary }} />}
            style={{ backgroundColor: "transparent" }}
          />
          <p margin={10}>PT SGF</p>
        </div>
      </div>

      {/* <Scrollbars > */}
      <SimpleBar
        style={{ maxHeight: `calc(100vh - ${heightSideTop}px)` }}
        forceVisible="y"
        autoHide={true}
      >
        <Menu
          theme="dark"
          mode="inline"
          className={classes.menu}
          items={menus || []}
          selectedKeys={!!current?.key ? [current?.key] : []}
          onClick={(e) => {
            // dispatch(setSelectedMenu(e.key));
            setCurrentOpenMenu({
              key: e.keyPath[e.keyPath.length - 1],
            });
            setCurrent(e);
          }}
          openKeys={!!currentOpenMenu?.key ? [currentOpenMenu?.key] : [""]}
          onOpenChange={(keys) => {
            setCurrentOpenMenu({ key: keys[keys.length - 1] });
          }}
        />
      </SimpleBar>
      {/* </Scrollbars> */}
    </Sider>
  );
}
