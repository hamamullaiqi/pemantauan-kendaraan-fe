import Axios from 'axios'
import Config from '../config/env'

const {BaseUrl} = Config

const checkResponse = (resp, onTokenInvalid) => {
    if (resp.data) {
        const {error, message} = resp.data
        if (error === 0) return resp.data
        else if ((error === 401) || (error === 403)) {
            if (typeof onTokenInvalid === 'function') onTokenInvalid()
            return true;
        } else throw new Error(message)
        // throw new Error("Session Expired")
    }
    throw new Error(`Unknown Error ${resp.statusText}`)
}

export const PostData = async (url, data, token, apps, onTokenInvalid) => {
    const resp = await Axios.post(url, data, {
        baseURL:BaseUrl,
        responseType:'json',        
        headers:{
            srawungToken:token,
            srawungApps:apps,
            srawungApp:apps,
            'Content-Type':'application/json'
        }
    })
    return checkResponse(resp, onTokenInvalid)
}

// create PostMultipartFormData

export const GetData = async (url, token, apps, onTokenInvalid) => {
    const resp = await Axios.get(url, {
        baseURL:BaseUrl, 
        responseType:'json',
        headers:{
            srawungToken:token,
            srawungApps:apps,
            srawungApp:apps,
            'Content-Type':'application/json'
        }
    })
    return checkResponse(resp, onTokenInvalid)
}
