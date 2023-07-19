import { theme } from "antd";
import { useEffect, useMemo, useState } from "react";

export const useLocalTheme = ({ appName }) => {
    //   const siderBackground = "rgb(5,150,105)";
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDark, setIsDark] = useState(false);

    function setColorBasedOnBackground(bgColor) {
        let color = "rgba(0,0,0,0.6)"; // default to black
        const r = parseInt(bgColor.substr(1, 2), 16);
        const g = parseInt(bgColor.substr(3, 2), 16);
        const b = parseInt(bgColor.substr(5, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
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
    const colorPrimary = "#B31312";
    const headerColor = !!isDark ? "#FFFFFF" : "#FFFFFF";
    // const menuColor = !!isDark ? "#FFFFFF" : setColorBasedOnBackground(selectedMenuBg);
    const headerBackground = !!isDark ? "#0F0F0F" : "#FFFFFF";
    const contentBackground = !!isDark && "#0F0F0F";
    const selectedMenuBg = !!isDark ? colorPrimary : colorPrimary;
    const menuColor = setColorBasedOnBackground(selectedMenuBg);
    const siderBg = !!isDark ? "#0d0d0d" : "#2B2A4C";

    useEffect(() => {
        const currentTheme = localStorage.getItem(`${appName}theme`);
        !!currentTheme && currentTheme === "dark"
            ? setIsDark(true)
            : setIsDark(false);
    }, [isDark]);

    return {
        menuColor,
        headerBackground,
        contentBackground,
        headerColor,
        colorPrimary,
        siderBg,
        selectedMenuBg,
        algorithm,
        isDark,
        toggleDarkMode,
    };
};
