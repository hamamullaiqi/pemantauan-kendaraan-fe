import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Navigate,
} from "react-router-dom";
import AppsPage from "./apps";
import Landing from "../components/layout/Landing";
import Login from "../contents/auth/Login";
import Profile from "./apps/pages/profile/profile";
import ForgotPassword from "./auth/ForgotPassword";

export default function MainRouter() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Navigate to=<Landing />}></Route> */}
                <Route exact path="/" element={<Landing />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/apps/*" element={<AppsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/*" element={<div>Not Found</div>} />
            </Routes>
        </Router>
    );
}
