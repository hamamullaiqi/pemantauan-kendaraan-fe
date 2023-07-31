import {
  HiClipboardList,
  HiHome,
  HiOutlineDocument,
  HiClipboard,
} from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const SIZE = 18;

const Menus = [
  {
    key: "/apps/home",
    icon: <HiHome size={SIZE} />,
    level: 0x1fff,
    role: ["ADM"],
    label: <Link to={"/apps/home"}>Home</Link>,
  },
  {
    key: "/apps/master",
    icon: <HiClipboardList size={SIZE} />,
    level: 0x1ff0,
    role: ["ADM", "MNG"],

    children: [
      {
        key: "/apps/master/masuk",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        label: <Link to={"/apps/master/masuk"}>Kendaraan Masuk</Link>,
        role: ["ADM"],
      },
      {
        key: "/apps/master/keluar",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        label: <Link to={"/apps/master/keluar"}>Kendaraan Keluar</Link>,
        role: ["ADM"],
      },
      {
        key: "/apps/master/produk",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        label: <Link to={"/apps/master/produk"}>Produk</Link>,
        role: ["ADM"],
      },
      {
        key: "/apps/master/vendor",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        label: <Link to={"/apps/master/vendor"}>Vendor</Link>,
        role: ["ADM"],
      },
      {
        key: "/apps/master/users",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        label: <Link to={"/apps/master/users"}>Users</Link>,
        role: ["MNG"],
      },
    ],
    label: <Link to={"#"}>Master</Link>,
  },
  {
    key: "/apps/laporan",
    icon: <HiClipboard size={SIZE} />,
    level: 0x1ff0,
    role: ["ADM", "MNG"],

    children: [
      {
        key: "/apps/laporan/kendaraan-masuk",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        role: ["ADM", "MNG"],

        label: (
          <Link to={"/apps/laporan/kendaraan-masuk"}>Kendaraan Masuk</Link>
        ),
      },
      {
        key: "/apps/laporan/kendaraan-keluar",
        icon: <GoDotFill size={SIZE} />,
        level: 0x1ff0,
        role: ["ADM", "MNG"],

        label: (
          <Link to={"/apps/laporan/kendaraan-keluar"}>Kendaraan Keluar</Link>
        ),
      },
    ],
    label: <Link to={"#"}>Laporan</Link>,
  },
];

export default Menus;
