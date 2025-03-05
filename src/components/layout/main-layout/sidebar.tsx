import type React from "react"
import { Briefcase, Calendar, Cog, FileText, FolderClosed, MessageSquare, MessageSquareMore } from "lucide-react"
import { useLogoutUser } from "@/redux/hooks/user"

interface NavItemProps {
    href: string
    icon: React.ReactNode
    label: string
    isActive?: boolean
}

function NavItem({ icon, label, isActive }: NavItemProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center py-3 text-xs ${isActive ? "text-blue-500" : "text-gray-400 hover:text-gray-500"
                }`}
        >
            {icon}
            <span className="mt-1">{label}</span>
        </div>
    )
}

export default function SidebarNavigation() {

    const logout = useLogoutUser()

    const onLogout = () => {
        window.location.href = "/"
        logout()
    }

    return (
        <div className="flex h-screen w-24 flex-col items-center border-r bg-white py-4">
            <div className="mb-8">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-green-100">
                    <div className="h-full w-full" />
                </div>
            </div>

            <div className="flex flex-1 flex-col space-y-4">
                <NavItem
                    href="/chats"
                    icon={<MessageSquareMore size={20} />}
                    label="All chats"
                    isActive
                />

                <NavItem href="/work" icon={<Briefcase size={20} />} label="Work" />

                <NavItem
                    href="/personal"
                    icon={<MessageSquare size={20} />}
                    label="Personal"
                />

                <NavItem href="/saved" icon={<FileText size={20} />} label="Saved" />

                <NavItem href="/calendar" icon={<Calendar size={20} />} label="Calendar" />

                <NavItem href="/files" icon={<FolderClosed size={20} />} label="Files" />
            </div>

            <div className="mt-auto">
                <button onClick={onLogout}>
                    <NavItem href="/settings" icon={<Cog size={20} />} label="Settings" />
                </button>
            </div>
        </div>
    )
}

