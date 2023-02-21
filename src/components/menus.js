import { HiHome } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";
import { RiPagesFill } from "react-icons/ri";
import { MdPanTool } from "react-icons/md";

const SIZE = 18;

export const Menus = [
  {
    key: "Apps",
    icon: <HiHome size={SIZE} />,
    children: [
      {
        key: "Dashboard",
        icon: <HiHome size={SIZE} />,
        children: null,
        label: "Dashboard",
      },
    ],
    label: "Apps",
    type: "group",
  },
  {
    key: "Components",
    icon: <FaBoxOpen size={SIZE} />,
    type: "group",
    children: [
      {
        key: "Pages",
        icon: <RiPagesFill size={SIZE} />,
        children: [
          {
            key: "Table",
            label: "Table",
          },
          {
            key: "404Pages",
            label: "404 page",
          },
          {
            key: "NoResut",
            label: "No Result Page",
          },
          {
            key: "login",
            label: "Login",
          },
          {
            key: "register",
            label: "Register",
          },
        ],
        label: "Pages",
      },
      {
        key: "Utils",
        icon: <MdPanTool size={SIZE} />,
        children: null,
        label: "Utils",
      },
    ],
    label: "Components",
  },
];
