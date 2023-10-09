import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Singleton from "../design-patterns/1-singleton/Singleton.jsx";
import Provider from "../design-patterns/3-provider/Provider.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/singleton",
    element: <Singleton />,
  },
  {
    path: "/provider",
    element: <Provider />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
