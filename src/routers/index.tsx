import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UnauthenticatedProtectedRoute from "./unauthenticated-protected-route";

import Home from "@/pages/home";
import Welcome from "@/pages/welcome";
import MainLayout from "@/components/layout/main-layout";

const router = createBrowserRouter([
    {
        path: "/welcome",
        element: <Welcome />
    },
    {
        path: "/",
        element:
            <UnauthenticatedProtectedRoute>
                <MainLayout />
            </UnauthenticatedProtectedRoute>,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ]
    },
]);

function Routers() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routers