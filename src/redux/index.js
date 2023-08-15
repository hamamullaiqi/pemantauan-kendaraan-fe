import * as Apps from "./reducer/apps";
import * as Auth from "./reducer/auth";
import * as Nav from "./reducer/navigations";
import * as Api from "./reducer/apiHandling";

export const {
    doLogout,
    initComplete,
    initMe,
    login,
    logout,
    setApps,
    successLogin,
    forgotPassword,
} = Auth;
export const {
    loadAirlines,
    loadAirports,
    setAirline,
    setAirport,
    setLoading,
    unsetLoading,
    setLanguage,
    loadRules,
} = Apps;
export const { setOpenKeys, setSelectedMenu, setSelectedMenuKeys } = Nav;
export const { GetAPI, PostAPI, PatchAPI } = Api;
