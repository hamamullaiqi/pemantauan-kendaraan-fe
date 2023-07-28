import Home from "./home";
import Produk from "./master/produks";
import User from "./master/users";
import Vendor from "./master/vendors";
import LaporanMasuk from "./laporan/laporanKendaraanMauk";
import LaporanKeluar from "./laporan/laporanKendaranKeluars";

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
  {
    to: "/master/users",
    level: 0x1ff0,
    component: <User />,
  },
  {
    to: "/laporan/laporankendaraanmasuk",
    level: 0x1ff0,
    component: <LaporanMasuk />,
  },

  {
    to: "/laporan/laporankendaraankeluar",
    level: 0x1ff0,
    component: <LaporanKeluar />,
  },
];
