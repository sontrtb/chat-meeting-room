import { Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { IMessage } from "@/api/message"
import { useGetListUser } from "@/redux/hooks/list-user"
import { useMemo } from "react"

function MessageItem({ message }: { message: IMessage }) {
    const listUser = useGetListUser()

    const user = useMemo(() => {
        return listUser.find(u => u.id === message.speaker)
    }, [listUser, message.speaker])

    return (
        <div className="flex justify-start">
            <Avatar className="h-12 w-12 mr-2">
                <AvatarFallback>
                    {user?.name
                        ?.split(" ")
                        .map((n) => n[0] || n[1])
                        .join("")
                        ?? "AN"
                    }
                </AvatarFallback>
            </Avatar>
            <div className="max-w-[75%] order-2">
                <div
                    className="rounded-2xl p-3 bg-slate-50 text-gray-800 rounded-tl-none shadow-xl border"
                >
                    <div>{message.content}</div>
                    <div
                        className="text-xs mt-1 flex justify-end items-center text-gray-500"
                    >
                        {"10:12"}
                        <Check className="w-3 h-3 ml-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageItem