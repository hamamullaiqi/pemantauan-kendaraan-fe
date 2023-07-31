import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenKeys, setSelectedMenu } from "../../redux";
import Scrollbars from "react-custom-scrollbars";
import SimpleBar from "simplebar-react";
import LogoPt from "../../assets/img/logoptsgf.png";
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
    const { selectedMenu, openKeys } = useSelector((state) => state.apps);
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

    const menusLevel = useMemo(() => {
        if (!Array.isArray(menus)) return [];
        let result = [];
        for (let i = 0; i < menus.length; i++) {
            const { role, children } = menus[i];
            let newChildren =
                !!children && children?.length !== 0 ? [...children] : [];
            if (role.includes(userdata?.role)) {
                if (Array.isArray(children)) {
                    newChildren = children.filter((item) =>
                        item?.role.includes(userdata?.role)
                    );
                }
                result.push({ ...menus[i], children: newChildren });
            }
        }
        // return (
        //     Array.isArray(menus) &&
        //     // menus?.filter((item) => (item.level & userdata.level) > 0)
        //     menus?.filter((item) => item.role?.includes(userdata?.role))
        // );
        return result;
    }, [menus]);

    useEffect(() => {
        let result = {};
        let toOpen = {};
        if (Array.isArray(menusLevel)) {
            for (let iii = 0; iii < menusLevel.length; iii++) {
                const el = menusLevel[iii];
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
                    <img src={LogoPt} width={75} height={50} alt="" />

                    <p>PT SGF</p>
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
                    items={menusLevel || []}
                    selectedKeys={!!current?.key ? [current?.key] : []}
                    onClick={(e) => {
                        // dispatch(setSelectedMenu(e.key));
                        setCurrentOpenMenu({
                            key: e.keyPath[e.keyPath.length - 1],
                        });
                        setCurrent(e);
                    }}
                    openKeys={
                        !!currentOpenMenu?.key ? [currentOpenMenu?.key] : [""]
                    }
                    onOpenChange={(keys) => {
                        setCurrentOpenMenu({ key: keys[keys.length - 1] });
                    }}
                />
            </SimpleBar>
            {/* </Scrollbars> */}
        </Sider>
    );
}
