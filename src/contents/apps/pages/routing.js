import Home from "./home";
import Produk from "./master/produks";
import User from "./master/users";
import Vendor from "./master/vendors";
import Masuk from "./master/kendaraan/masuk";
import Keluar from "./master/kendaraan/keluar";
import LaporanMasuk from "./laporan/KendaraanMasuk";
import LaporanKeluar from "./laporan/KendaranKeluars";

export const Routing = [
    {
        to: "/home",
        level: 0x1fff,
        component: <Home />,
    },
    {
        to: "/master/masuk",
        level: 0x1ff0,
        component: <Masuk />,
    },
    {
        to: "/master/keluar",
        level: 0x1ff0,
        component: <Keluar />,
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
    {
        to: "/master/users",
        level: 0x1ff0,
        component: <User />,
    },
    {
        to: "/laporan/kendaraan-masuk",
        level: 0x1ff0,
        component: <LaporanMasuk />,
    },

    {
        to: "/laporan/kendaraan-keluar",
        level: 0x1ff0,
        component: <LaporanKeluar />,
    },
];
