import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAPI } from "./apiHandling";

const Apps = createSlice({
    name: "apps",
    initialState: {
        errorMessage: "",
        loading: false,
        theme: "light",
    },
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        unsetLoading(state) {
            state.loading = false;
        },
        setTheme(state, payload) {
            console.log(payload);
            state.theme = payload.payload;
        },
    },
});

export const { setLoading, unsetLoading, setTheme } = Apps.actions;
// export const loadAirports = createAsyncThunk(
//     "apps/load-airport",
//     async (payload, thunkApi) => {
//         const { dispatch } = thunkApi;
//         const resp = await dispatch(GetAPI({ url: "api/v1/airport/all" }));
//         if (resp?.payload?.data) dispatch(setAirport(resp.payload.data));
//     }
// );

export default Apps.reducer;
