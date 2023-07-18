import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

const SIZE = 18;

const Menus = [
    {
        key: "/apps/home",
        icon: <HiHome size={SIZE} />,
        level: 0x1fff,

        label: <Link to={"/apps/home"}>Home</Link>,
    },
];

export default Menus;
