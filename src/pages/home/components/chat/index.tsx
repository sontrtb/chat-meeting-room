"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import InputVoice from "./InputVoice"

interface Message {
    id: string
    sender: "Virginia Jordan" | "Gregory Williams" | "You"
    content: string
    timestamp: string
    isRead: boolean
    attachment?: {
        name: string
        type: string
        size: string
    }
}

function Chat() {
    const [messages] = useState<Message[]>([
        {
            id: "1",
            sender: "Virginia Jordan",
            content: "Hi, I've just finished my report.",
            timestamp: "12:38",
            isRead: true,
            attachment: {
                name: "report19-06-24.ppt",
                type: "PPT",
                size: "1.2 Mb",
            },
        },
        {
            id: "2",
            sender: "You",
            content: "Great job! How long did it take you?",
            timestamp: "12:42",
            isRead: true,
        },
        {
            id: "3",
            sender: "Virginia Jordan",
            content:
                "About two hours. I had to check some data and make sure everything was accurate. I also included the latest sales figures in the appendix.",
            timestamp: "12:49",
            isRead: true,
        },
        {
            id: "4",
            sender: "Gregory Williams",
            content: "Can you send me a copy of the report? I need to review it before we submit it to the boss.",
            timestamp: "12:57",
            isRead: true,
        },
        {
            id: "5",
            sender: "Virginia Jordan",
            content: "Sure, I'll send it right away.",
            timestamp: "13:00",
            isRead: true,
        },
        {
            id: "6",
            sender: "You",
            content: "I have a question about the report. Did you include the latest sales figures?",
            timestamp: "13:05",
            isRead: true,
        },
    ])


    const getProfileImage = (sender: string) => {
        switch (sender) {
            case "Virginia Jordan":
                return "/placeholder.svg?height=40&width=40"
            case "Gregory Williams":
                return "/placeholder.svg?height=40&width=40"
            default:
                return "/placeholder.svg?height=40&width=40"
        }
    }

    return (
        <div className="flex flex-col h-screen px-10">
            <div className="bg-white p-4 shadow-sm">
                <h1 className="font-semibold text-lg">Team Chat</h1>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                        {message.sender !== "You" && (
                            <div className="flex-shrink-0 mr-2">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={getProfileImage(message.sender) || "/placeholder.svg"} />
                                        <AvatarFallback>
                                            {"name"
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        )}
                        <div className={`max-w-[75%] ${message.sender === "You" ? "order-1" : "order-2"}`}>
                            {message.sender !== "You" && <div className="font-medium text-sm mb-1 ml-1">{message.sender}</div>}
                            <div
                                className={`rounded-2xl p-3 ${message.sender === "You"
                                        ? "bg-blue-500 text-white rounded-tr-none"
                                        : "bg-white text-gray-800 rounded-tl-none shadow-sm"
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
                ))}
            </div>

            {/* <InputVoice /> */}
        </div>
    )
}


export default Chat