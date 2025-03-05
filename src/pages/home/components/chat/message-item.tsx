import { Message } from "./list-message"
import { Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function MessageItem({ message }: { message: Message }) {
    return (
        <div className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            {message.sender !== "You" && (
                <Avatar className="h-10 w-10 mr-2">
                    <AvatarFallback>
                        {"Name"
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
            )}
            <div className={`max-w-[75%] ${message.sender === "You" ? "order-1" : "order-2"}`}>
                {message.sender !== "You" && <div className="font-medium text-sm mb-1 ml-1">{message.sender}</div>}
                <div
                    className={`rounded-2xl p-3 ${message.sender === "You"
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : "bg-slate-50 text-gray-800 rounded-tl-none shadow-xl border"
                        }`}
                >
                    <div>{message.content}</div>
                    <div
                        className={`text-xs mt-1 flex justify-end items-center ${message.sender === "You" ? "text-blue-100" : "text-gray-500"
                            }`}
                    >
                        {message.timestamp}
                        {message.sender === "You" && message.isRead && <Check className="w-3 h-3 ml-1" />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageItem