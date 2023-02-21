import { theme } from "antd";
import { useEffect, useMemo, useState } from "react";


export const useTheme = () => {
//   const siderBackground = "rgb(5,150,105)";
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDark, setIsDark] = useState(false)

const algorithm = useMemo(()=>{
    return isDark ? darkAlgorithm :defaultAlgorithm
},[isDark])

const toggleDarkMode = (value)=>{
    !!value ? setIsDark(true) : setIsDark(false)
    !!value ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
}
  const menuColor = !!isDark ? "white" : 'white';
  const headerColor = !!isDark ? "white" : "white";
  const headerBackground = !!isDark ? '#080808' : "white";
  const colorPrimary ="#6F1AB6";
  const selectedMenuBg = !!isDark ? colorPrimary : "rgba(0, 0, 0, 0.3)"
  const siderBg = !!isDark ? '#111' : colorPrimary
  
  useEffect(()=>{
    const currentTheme = localStorage.getItem('theme')
    !!currentTheme && currentTheme === 'dark' ? setIsDark(true) : setIsDark(false)
  },[isDark])

  return { menuColor, headerBackground, headerColor, colorPrimary,siderBg, selectedMenuBg, algorithm, isDark, toggleDarkMode };
};
