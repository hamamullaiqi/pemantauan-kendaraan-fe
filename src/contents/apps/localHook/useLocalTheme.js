import { theme } from "antd";
import { useEffect, useMemo, useState } from "react";

export const useLocalTheme = ({appName}) => {
  //   const siderBackground = "rgb(5,150,105)";
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDark, setIsDark] = useState(false);

  const algorithm = useMemo(() => {
    return isDark ? darkAlgorithm : defaultAlgorithm;
  }, [isDark]);

  const toggleDarkMode = (value) => {
    !!value ? setIsDark(true) : setIsDark(false);
    !!value
      ? localStorage.setItem(`${appName}theme`, "dark")
      : localStorage.setItem(`${appName}theme`, "light");
  };
  const menuColor = !!isDark ? "white" : "white";
  const headerColor = !!isDark ? "white" : "white";
  const headerBackground = !!isDark ? "#080808" : "white";
  const colorPrimary = "#3A98B9";
  const selectedMenuBg = !!isDark ? colorPrimary : "rgba(0, 0, 0, 0.3)";
  const siderBg = !!isDark ? "#111" : colorPrimary;

  useEffect(() => {
    const currentTheme = localStorage.getItem(`${appName}theme`);
    !!currentTheme && currentTheme === "dark"
      ? setIsDark(true)
      : setIsDark(false);
  }, [isDark]);

  return {
    menuColor,
    headerBackground,
    headerColor,
    colorPrimary,
    siderBg,
    selectedMenuBg,
    algorithm,
    isDark,
    toggleDarkMode,
  };
};
