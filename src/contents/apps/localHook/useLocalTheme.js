import { theme } from "antd";
import { useEffect, useMemo, useState } from "react";

export const useLocalTheme = ({appName}) => {
  //   const siderBackground = "rgb(5,150,105)";
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDark, setIsDark] = useState(false);

  function setColorBasedOnBackground(bgColor) {
    let color = "rgba(0,0,0,0.6)"; // default to black
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    if (brightness < 128) {
      color = "#FFFFFF"; // set to white for dark backgrounds
    } 
    return color;
  }

  const algorithm = useMemo(() => {
    return isDark ? darkAlgorithm : defaultAlgorithm;
  }, [isDark]);

  const toggleDarkMode = (value) => {
    !!value ? setIsDark(true) : setIsDark(false);
    !!value
      ? localStorage.setItem(`${appName}theme`, "dark")
      : localStorage.setItem(`${appName}theme`, "light");
  };
  const headerColor = !!isDark ? "#FFFFFF" : "#FFFFFF";
  const headerBackground = !!isDark ? "#000" : "#FFFFFF";
  const colorPrimary = "#f8e71c";
  const selectedMenuBg = !!isDark ? colorPrimary : colorPrimary;
  // const menuColor = !!isDark ? "#FFFFFF" : setColorBasedOnBackground(selectedMenuBg);
  const menuColor = setColorBasedOnBackground(selectedMenuBg);
  const siderBg = !!isDark ? "#111" : "linear-gradient(187.01deg, #E76A42 3.17%, #A842E7 63.18%)";

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
