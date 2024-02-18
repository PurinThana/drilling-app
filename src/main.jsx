import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./firebaseConfic.js";

import Index from "./components/user/Index.jsx";
import Header from "./components/Header.jsx";
import Formcontact from "./components/input/Formcontact.jsx";
import Result from "./components/output/Result.jsx";
import FormCasing from "./components/input/FormCasing.jsx";
import DrillingEq from "./components/input/DrillingEq.jsx";
import PressureLost from "./components/input/PrussureLost.jsx";
import Cementing from "./components/input/Cementing.jsx";
import Confic from "./components/data/Confic.jsx";
import User_index from "./components/user/User_index.jsx";
import Register from "./components/user/Register.jsx";
import Login from "./components/user/Login.jsx";

import { AuthProvider } from "./context/Authcontext.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Index />
        </AuthProvider>
      ),
    },
    {
      path: "/resform",
      element: (
        <AuthProvider>
          <Formcontact />
        </AuthProvider>
      ),
    },
    {
      path: "/result",
      element: (
        <AuthProvider>
          <Result />
        </AuthProvider>
      ),
    },
    {
      path: "/casing",
      element: (
        <AuthProvider>
          <FormCasing />
        </AuthProvider>
      ),
    },
    {
      path: "/drilling_equipment",
      element: (
        <AuthProvider>
          <DrillingEq />
        </AuthProvider>
      ),
    },
    {
      path: "/pressurelost",
      element: (
        <AuthProvider>
          {" "}
          <PressureLost />
        </AuthProvider>
      ),
    },
    {
      path: "/cement",
      element: (
        <AuthProvider>
          <Cementing />
        </AuthProvider>
      ),
    },
    {
      path: "/confic",
      element: (
        <AuthProvider>
          <Confic />
        </AuthProvider>
      ),
    },
    {
      path: "/user/",
      element: (
        <AuthProvider>
          <User_index />
        </AuthProvider>
      ),
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ]);

  return (
    // <div className="">
    //   <Test />
    <AuthProvider>
      <React.StrictMode>
        <Header />

        <div className="content">
          <RouterProvider router={router} />
        </div>
      </React.StrictMode>
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
