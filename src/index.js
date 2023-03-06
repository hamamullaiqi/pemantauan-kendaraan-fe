import React, { Fragment, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import 'simplebar-react/dist/simplebar.min.css';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/reset.css";
import "./assets/css/style.css";
import SplashPage from './splash'
import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<SplashPage />}>
        <Fragment>
          <App />
          <ToastContainer newestOnTop autoClose={3000} />
        </Fragment>
      </Suspense>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
