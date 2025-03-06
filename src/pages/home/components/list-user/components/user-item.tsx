import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { IMember } from "@/api/member"

function UserItem({ message }: { message: IMember }) {
    return (
        <div className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50">
            <div className="relative">
                <Avatar className="h-12 w-12">
                    <AvatarFallback>
                        {message.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") ?? "KH"}
                    </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{message.name ?? "Khách hàng"}</h3>
                    <span className="text-xs text-gray-500">12:10</span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="line-clamp-1 text-sm text-gray-500">Đã vào phòng họp</p>
                </div>
            </div>
        </div>
    )
}

export default UserItem