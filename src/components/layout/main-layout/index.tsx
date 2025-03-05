import { Outlet } from "react-router-dom"
import SidebarNavigation from "./sidebar"

function MainLayout() {
    return (
        <div className="flex h-screen">
            <SidebarNavigation />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout