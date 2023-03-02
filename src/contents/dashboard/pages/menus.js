import { HiHome } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";
import { RiPagesFill } from "react-icons/ri";
import { MdPanTool } from "react-icons/md";
import { Link } from "react-router-dom";
import { getLanguage} from "../../../languages/utils";

const SIZE = 18;

export default (languages) => [
  {
    key: "/dashboard",
    icon: <HiHome size={SIZE} />,
    level: 0x1fff,
    children: [
      {
        key: "/dashboard/home",
        icon: <HiHome size={SIZE} />,
        level: 0x1fff,
        children: null,
        label: <Link to={"/dashboard/home"}>{getLanguage("Dashboard", languages)}</Link>,
      },
    ],
    label: "Dashboard",
    type: "group",
  },
  
];
