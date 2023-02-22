import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GetAPI} from '../redux'

export const useFetch = (url, noLoading=false) => {
    const dispatch = useDispatch()
    const {apps} = useSelector(state=>state.auth);
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if(!!url){
            setLoading(true)
            dispatch(GetAPI({url, apps, noLoading})).then(resp => {
                const {payload} = resp 
                setData(payload.data)
                setLoading(false)
            })
        }
    }, [url])

    return [data, loading]
}
