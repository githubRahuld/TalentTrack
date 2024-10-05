import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/store.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users/login",
        element: <Login />,
      },
      {
        path: "/users/register",
        element: <Register />,
      },
      {
        path: "/users/home",
        element: <Home />,
      },
      {
        path: "/admin/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/users/create-employee",
        element: <CreateEmployee />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <main>
      <RouterProvider router={router} />
    </main>
  </Provider>
);
