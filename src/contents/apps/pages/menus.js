import { HiHome } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";
import { RiPagesFill } from "react-icons/ri";
import { MdPanTool } from "react-icons/md";
import { Link } from "react-router-dom";
import { getLanguage} from "../../../languages/utils";

const SIZE = 18;

export default (languages) => [
  {
    key: "/apps",
    icon: <HiHome size={SIZE} />,
    level: 0x1fff,
    children: [
      {
        key: "/apps/home",
        icon: <HiHome size={SIZE} />,
        level: 0x1fff,
        children: [
          {
            key: "/apps/home",
            icon: <HiHome size={SIZE} />,
            level: 0x1fff,
            // children: [],
            label: <Link to={"/apps/home"}>{getLanguage("Apps", languages)}</Link>,
          },
          {
            key: "/apps/dash",
            icon: <HiHome size={SIZE} />,
            level: 0x1fff,
            // children: [],
            label: <Link to={"/apps/dash"}>{getLanguage("dash", languages)}</Link>,
          },
        ],
        label: <Link to={"/apps/home"}>{getLanguage("Apps", languages)}</Link>,
      },
    ],
    label: "Apps",
    type: "group",
  },
  
];
