import Home from "./home";
import Produk from "./master/produks";
import User from "./master/users";
import Vendor from "./master/vendors";
import Masuk from "./master/kendaraan/masuk";
import Keluar from "./master/kendaraan/keluar";
import LaporanMasuk from "./laporan/KendaraanMasuk";
import LaporanKeluar from "./laporan/KendaranKeluars";
import Profile from "./profile/profile";

export const Routing = [
  {
    to: "/profile",
    level: 0x1fff,
    component: <Profile />,
    role: ["ADM", "MNG"],
  },
  {
    to: "/home",
    level: 0x1fff,
    component: <Home />,
    role: ["ADM"],
  },
  {
    to: "/master/masuk",
    level: 0x1ff0,
    component: <Masuk />,
    role: ["ADM"],
  },
  {
    to: "/master/keluar",
    level: 0x1ff0,
    component: <Keluar />,
    role: ["ADM"],
  },
  {
    to: "/master/produk",
    level: 0x1ff0,
    component: <Produk />,
    role: ["ADM"],
  },
  {
    to: "/master/vendor",
    level: 0x1ff0,
    component: <Vendor />,
    role: ["ADM"],
  },
  {
    to: "/master/users",
    level: 0x1ff0,
    component: <User />,
    role: ["MNG"],
  },
  {
    to: "/master/users",
    level: 0x1ff0,
    role: ["MNG"],
    component: <User />,
  },
  {
    to: "/laporan/kendaraan-masuk",
    level: 0x1ff0,
    role: ["ADM", "MNG"],
    component: <LaporanMasuk />,
  },

  {
    to: "/laporan/kendaraan-keluar",
    level: 0x1ff0,
    role: ["ADM", "MNG"],

    component: <LaporanKeluar />,
  },
];
