import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenKeys, setSelectedMenu } from "../../redux";
import Scrollbars from "react-custom-scrollbars";
import SimpleBar from "simplebar-react";
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

    const [current, setCurrent] = useState("");

    const rootSubmenuKeys = useMemo(() => {
        return menus?.map(({ key }) => key);
    }, [menus]);

    useEffect(() => {
        setHeightSideTop(ref.current.clientHeight);
    }, []);

    useEffect(() => {
        if (Array.isArray(menus)) {
            const defCurr = menus.find(
                (item) => item.key === window.location.pathname
            );
            setCurrent(defCurr);
        }
    }, [menus]);

    console.log(current, menus);
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
            // style={{}}
            style={{ background: siderBg, height: "100vh" }}
        >
            <div ref={ref}>
                <div className={classes.logo}>
                    <Avatar
                        icon={
                            <SafetyCertificateFilled
                                style={{ color: colorPrimary }}
                            />
                        }
                        style={{ backgroundColor: "white" }}
                    />
                    <p>WHITESPACE</p>
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
                    selectedKeys={[current.key]}
                    onClick={(e) => {
                        // dispatch(setSelectedMenu(e.key));
                        setCurrent(e);
                    }}
                    openKeys={openKeys}
                    onOpenChange={(keys) => {
                        const latestOpenKey = keys.find(
                            (key) => openKeys.indexOf(key) === -1
                        );
                        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                            dispatch(setOpenKeys(keys));
                        } else {
                            dispatch(
                                setOpenKeys(
                                    latestOpenKey ? [latestOpenKey] : []
                                )
                            );
                        }
                    }}
                />
            </SimpleBar>
            {/* </Scrollbars> */}
        </Sider>
    );
}
