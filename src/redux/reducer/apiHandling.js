import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, unsetLoading } from "./apps";
import { logout } from "./auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const tokenStr = window.localStorage.getItem("token");
export const API = Axios.create({
    baseURL: `${process.env.REACT_APP_SERVICEAPI}`,
    headers: {
        Authorization: `Bearer ${tokenStr}` ?? localStorage.getItem("token"),
    },
});

export const defConfig = () => {
    const tokenStr = window.localStorage.getItem("token");

    return {
        headers: {
            "Content-type": "application/json",
            Authorization:
                `Bearer ${tokenStr}` ?? localStorage.getItem("token"),
        },
    };
};

const formConfig = (type) => {
    if (!type) throw Error("invalid content-type");
    return {
        headers: {
            "Content-type": `${type}`,
        },
    };
};

const doTokenInvalid = (dispatch) => () => {
    dispatch(logout());
};
export const PostAPI = createAsyncThunk(
    "API/Post",
    async (payload, thunkApi) => {
        const { dispatch, getState } = thunkApi;
        dispatch(setLoading());
        const {
            auth: { apps, token },
        } = getState();
        const { url, data, config } = payload;
        let toConfig =
            config === "application/json" || !config
                ? defConfig()
                : formConfig(config);
        let response = false;
        try {
            const resp = await API.post(url, data, toConfig);
            response = resp.data;
        } catch (error) {
            console.log({ error });
            toast.dismiss();
            toast.error(error.message);
        }
        dispatch(unsetLoading());
        return response;
    }
);

export const PatchAPI = createAsyncThunk(
    "API/Patch",
    async (payload, thunkApi) => {
        const { dispatch, getState } = thunkApi;
        dispatch(setLoading());
        const {
            auth: { apps, token },
        } = getState();
        const { url, data, config } = payload;
        let toConfig =
            config === "application/json" || !config
                ? defConfig()
                : formConfig(config);
        let response = false;
        try {
            const resp = await API.patch(url, data, toConfig);
            response = resp.data;
        } catch (error) {
            console.log({ error });
            toast.dismiss();
            toast.error(error.message);
        }
        dispatch(unsetLoading());
        return response;
    }
);

export const DestroyAPI = createAsyncThunk(
    "API/Patch",
    async (payload, thunkApi) => {
        const { dispatch, getState } = thunkApi;
        dispatch(setLoading());
        const {
            auth: { apps, token },
        } = getState();
        const { url } = payload;

        let response = false;
        try {
            const resp = await API.delete(url, defConfig());
            response = resp.data;
        } catch (error) {
            console.log({ error });
            toast.dismiss();
            toast.error(error.message);
        }
        dispatch(unsetLoading());
        return response;
    }
);

export const GetAPI = createAsyncThunk("API/Get", async (payload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const {
        auth: { apps, token },
    } = getState();
    const { url, noLoading } = payload;
    if (!noLoading) dispatch(setLoading());
    let response = false;
    console.log(url);
    try {
        response = await API.get(url, defConfig());
        console.log(response);
    } catch (error) {
        toast.dismiss();
        toast.error(error.message);
    }
    if (!noLoading) dispatch(unsetLoading());
    return response;
});
