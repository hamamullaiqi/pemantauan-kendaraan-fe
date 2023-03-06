import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import DashboardPage from './dashboard'
import AppsPage from './apps'
import Login from "./auth/Login";


export default function MainRouter() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />}>
        </Route>
        <Route path="/landing" element={<span>landing</span>} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/apps/*" element={<AppsPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}