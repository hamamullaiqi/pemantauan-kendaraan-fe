import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {GetAPI} from './apiHandling';
import {levels} from './levelConvert';
const lan=localStorage.getItem('language') || 'id';
const name=localStorage.getItem('languageName') || 'Indonesia';

const Apps = createSlice({
    name:'apps',
    initialState:{errorMessage:'', loading:false, 
        airportCache:[], airlineCache:[], language:lan, name, levels, rules:{}},
    reducers:{
        setLoading(state) {
            state.loading = true
        },
        unsetLoading(state) {
            state.loading = false
        },
        setAirport(state, payload) {
            state.airportCache = payload.payload
        },
        setAirline(state, payload) {
            state.airlineCache = payload.payload
        },
        setLanguage(state, payload){
            state.language=payload.payload.language;
            state.name=payload.payload.name;
            localStorage.setItem('language', payload.payload.language);
            localStorage.setItem('languageName', payload.payload.name);
        },
        setRules(state, payload){
            state.rules={...payload.payload};
        }
    }
})

export const {setLoading, unsetLoading, setAirline, setAirport, setLanguage, setRules} = Apps.actions
export const loadAirports = createAsyncThunk(
    'apps/load-airport', async(payload, thunkApi) => {
        const {dispatch} = thunkApi
        const resp = await dispatch(GetAPI({url:'api/v1/airport/all'}))
        if (resp?.payload?.data) dispatch(setAirport(resp.payload.data))
    }
    
)

export const loadAirlines = createAsyncThunk(
    'apps/load-airlines', async(payload, thunkApi) => {
        const {dispatch} = thunkApi
        const resp = await dispatch(GetAPI({url:'api/v1/airlines/all'}))
        if (resp?.payload?.data) dispatch(setAirline(resp.payload.data))
    }    
)

export const loadRules = createAsyncThunk(
    'apps/load-rules', async(payload, thunkApi)=>{
        const {dispatch} = thunkApi;
        const resp = await dispatch(GetAPI({url:'api/v1/rules'}));
        if(resp?.payload?.data)dispatch(setRules(resp.payload.data));
    }
)

export default Apps.reducer