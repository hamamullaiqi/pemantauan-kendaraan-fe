import {createAsyncThunk} from '@reduxjs/toolkit'
import {setLoading, unsetLoading} from './apps'
import {GetData, PostData} from '../caller'  
import {logout} from './auth'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const doTokenInvalid = dispatch => () => {
    dispatch(logout())
}
export const PostAPI = createAsyncThunk('API/Post', async (payload, thunkApi) => {
    const {dispatch, getState} = thunkApi
    dispatch(setLoading())
    const {auth:{apps, token}} = getState()
    const {url, data} = payload
    let response = false
    try {
        const resp = await PostData(url, data, token, apps, doTokenInvalid(dispatch))
        response = resp.data
    } catch (error) {
        console.log({error})
        toast.dismiss();
        toast.error(error.message)
    }
    dispatch(unsetLoading())
    return response
})

export const GetAPI = createAsyncThunk('API/Get', async (payload, thunkApi) => {
    const {dispatch, getState} = thunkApi
    const {auth:{apps, token}} = getState()
    const {url, noLoading} = payload
    if(!noLoading) dispatch(setLoading())
    let response = false
    try {
        response = await GetData(url, token, apps, doTokenInvalid(dispatch))
    } catch (error) {
        toast.dismiss();
        toast.error(error.message)
    }
    if(!noLoading)dispatch(unsetLoading())
    return response
})
