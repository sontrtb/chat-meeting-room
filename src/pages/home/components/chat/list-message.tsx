import { useState } from "react"
import MessageItem from "./message-item"

export interface Message {
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

function ListMessage() {

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

    return (
        <div className="flex-1 overflow-y-auto p-10 space-y-4">
            {messages.map((message) => (
                <MessageItem key={message.id} message={message}/>
            ))}
        </div>
    )
}

export default ListMessage