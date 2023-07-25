import { HiClipboardList, HiHome } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const SIZE = 18;

const Menus = [
    {
        key: "/apps/home",
        icon: <HiHome size={SIZE} />,
        level: 0x1fff,

        label: <Link to={"/apps/home"}>Home</Link>,
    },
    {
        key: "/apps/master",
        icon: <HiClipboardList size={SIZE} />,
        level: 0x1ff0,
        children: [
            {
                key: "/apps/master/produk",
                icon: <GoDotFill size={SIZE} />,
                level: 0x1ff0,
                label: <Link to={"/apps/master/produk"}>Produk</Link>,
            },
            {
                key: "/apps/master/vendor",
                icon: <GoDotFill size={SIZE} />,
                level: 0x1ff0,
                label: <Link to={"/apps/master/vendor"}>Vendor</Link>,
            },
            {
                key: "/apps/master/users",
                icon: <GoDotFill size={SIZE} />,
                level: 0x1ff0,
                label: <Link to={"/apps/master/users"}>Users</Link>,
            },
        ],
        label: <Link to={"#"}>Master</Link>,
    },
];

export default Menus;
