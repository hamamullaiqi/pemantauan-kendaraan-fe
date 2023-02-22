import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {GetAPI, PostAPI} from './apiHandling'
import jwtDecode from 'jwt-decode'
import {toast} from 'react-toastify'
import {levelToRole} from './levelConvert'
import CFG from '../../config/env';

const {Title} = CFG;
const authSlice = createSlice({
    name:'auth',
    initialState:{userdata:false, token:'', apps:'', initComplete:false},
    reducers:{
        successLogin(state, action) {
            const {userdata} = action.payload;            
            const levelStr = levelToRole(userdata.level || 0);            
            state.userdata = {...userdata, levelStr};
            state.token = action.payload.token
        },
        setApps(state, action) {
            state.apps = action.payload
        },
        doLogout(state) {
            state.userdata = false
            state.token = ''
            window.localStorage.removeItem('token')
        },
        initComplete(state) {
            state.initComplete = true
        }
    }
})

export const {successLogin, setApps, doLogout, initComplete} = authSlice.actions

export const login = createAsyncThunk('auth/login', async({user, password, app, ...rest}, thunkAPI) => {
    const {dispatch, getState} = thunkAPI
    const {auth:{apps}} = getState()
    const tokenName = `token`
    const token = await dispatch(PostAPI({url:'auth/login', data:{username:user, password, app, ...rest}}))
    if (!!token.payload) {
        const userdata = jwtDecode(token.payload)
        window.localStorage.setItem(tokenName, token.payload)
        dispatch(successLogin({token:token.payload, userdata}))
        toast.success(`Welcome to ${Title}, ${userdata?.name}`)
    }
})
export const logout = createAsyncThunk('auth/logout', async (body, thunkAPI) => {
    const {dispatch, getState} = thunkAPI
    const {auth:{apps}} = getState()
    // try {
    //     await dispatch(GetAPI({url:'auth/logout'}))        
    // } catch (error) {        
    // }
    const tokenName = `token`
    window.localStorage.removeItem(tokenName)
    dispatch(doLogout())
})
export const initMe = createAsyncThunk('auth/me', async (body, thunkAPI) => {
   //dipslay masih splash
    const {dispatch, getState} = thunkAPI
    const {auth:{apps}} = getState()
    const tokenName = `token`
    const token = window.localStorage.getItem(tokenName)
    if (!!token) {
        const userdata = jwtDecode(token)
        dispatch(successLogin({userdata, token}))
        dispatch(GetAPI({url:'auth/me'}))
        if (userdata) dispatch(successLogin({userdata, token}))
    }
    dispatch(initComplete())
})
// export const login
export default authSlice.reducer