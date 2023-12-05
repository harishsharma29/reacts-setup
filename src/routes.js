import { Navigate, useRoutes } from "react-router-dom";
// layouts
// import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import Login from "./pages/Login";

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: "/dashboard",
            element: <div>Dashboard</div>,
            children: [{ path: "app", element: <div>Dashboard</div> }]
        },
        {
            path: "/",
            element: <LogoOnlyLayout />,
            children: [
                { path: "/", element: <Navigate to="login" /> },
                { path: "login", element: <Login /> },
                { path: "*", element: <Navigate to="/404" /> }
            ]
        },
        { path: "*", element: <Navigate to="/404" replace /> }
    ]);
}
