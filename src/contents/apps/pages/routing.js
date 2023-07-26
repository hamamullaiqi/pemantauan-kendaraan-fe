import Home from "./home";
import Produk from "./master/produks";
import User from "./master/users";
import Vendor from "./master/vendors";

export const Routing = [
    {
        to: "/home",
        level: 0x1fff,
        component: <Home />,
    },
    {
        to: "/master/produk",
        level: 0x1ff0,
        component: <Produk />,
    },
    {
        to: "/master/vendor",
        level: 0x1ff0,
        component: <Vendor />,
    },
    {
        to: "/master/users",
        level: 0x1ff0,
        component: <User />,
    },
];
