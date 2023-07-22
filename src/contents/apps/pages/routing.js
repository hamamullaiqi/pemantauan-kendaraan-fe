import Home from "./home";
import Produk from "./master/produks";

export const Routing = [
    {
        to: "/home",
        level: 0x1fff,
        component: <Home />,
    },
    {
        to: "/master/produk",
        level: 0x1fff,
        component: <Produk />,
    },
];
