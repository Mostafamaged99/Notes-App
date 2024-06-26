import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./Login/Login";
import Register from "./components/Register/Register";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { RecoilRoot } from "recoil";
import ReverseProtectedRoutes from "./ReverseProtectedRoutes/ReverseProtectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

const routes = createBrowserRouter([
  {
    index: "true",
    element: <Register />,
  },
  {
    path: "register",
    element: (
      <ReverseProtectedRoutes>
        <Register />
      </ReverseProtectedRoutes>
    ),
  },
  {
    path: "login",
    element: (
      <ReverseProtectedRoutes>
        <Login />
      </ReverseProtectedRoutes>
    ),
  },
  { path: "*", element: <ErrorPage /> },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />{" "}
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routes} />
      </RecoilRoot>
    </>
  );
}

export default App;
