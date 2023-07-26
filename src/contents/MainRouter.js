import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import AppsPage from "./apps";
import Landing from "../components/layout/Landing";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to=<Landing />}></Route> */}
        <Route exact path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/apps/*" element={<AppsPage />} />
        <Route path="/*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}
