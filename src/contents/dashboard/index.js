import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect, Routes, Navigate} from 'react-router-dom'
import { initMe, setApps } from '../../redux/reducer/auth';

import LoginPage from '../auth/Login';
import DashboardPages from './pages';
import SplashPage from '../../splash'


const UserPage=({userdata})=>{
    console.log(userdata);
    return (
        // <Router basename='/dashboard'>
            <Routes>
                <Route exact path="/" element={(!!userdata && <Navigate to={'/home'} /> ) || <Navigate to="/login"/>} />
                <Route exact path="/login" element={(!!userdata && <Navigate to={'/home'} /> ) || <LoginPage apps={"Dashboard"} />} />
                <Route path="/*" element={(!!userdata && <DashboardPages idx={new Date().getTime()} /> ) || <Navigate to="/login"/>} />
            </Routes>
        // </Router>
    )
}

export default () => {
    const {userdata, initComplete} = useSelector(state=>state.auth)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setApps('head-office')); // set applikasi
        dispatch(initMe()); // cek token validasi        
    }, [initMe, setApps])
    if(!initComplete)return <SplashPage />
    return <UserPage userdata={userdata}/>
}