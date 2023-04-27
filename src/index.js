import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Auth from "./pages/Auth";

import store from "./store/index";
import { Provider } from "react-redux";

import Loading from "./components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Loading>
        <Home />
      </Loading>
    ),
  },
  {
    path: "auth",
    element: (
      <Loading>
        <Auth />
      </Loading>
    ),
  },
  {
    path: "signin",
    element: (
      <Loading>
        <SignIn />
      </Loading>
    ),
  },
  {
    path: "register",
    element: (
      <Loading>
        <Register />
      </Loading>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
