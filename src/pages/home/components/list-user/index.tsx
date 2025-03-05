import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import UserItem from "./components/user-item"
import ModalAddVoice from "./components/modal-add-voice"
import { useState } from "react"
 
export interface Message {
    id: string
    sender: {
        name: string
        avatar: string
        online?: boolean
    }
    preview: string
    time: string
    status: "read" | "delivered" | "unread"
    unreadCount?: number
}

const messages: Message[] = [
    {
        id: "1",
        sender: {
            name: "TechPulse Company",
            avatar: "/placeholder.svg?height=80&width=80",
        },
        preview: "Reminder that we have a project meeting...",
        time: "13:02",
        status: "read",
    },
    {
        id: "2",
        sender: {
            name: "Michelle Davis",
            avatar: "/placeholder.svg?height=80&width=80",
            online: true,
        },
        preview: "Just finished a workout and feeling en...",
        time: "13:02",
        status: "delivered",
    },
    {
        id: "3",
        sender: {
            name: "Joseph King",
            avatar: "/placeholder.svg?height=80&width=80",
        },
        preview: "Please prepare a presentation on the r...",
        time: "13:02",
        status: "unread",
        unreadCount: 1,
    },
    {
        id: "4",
        sender: {
            name: "Brian Alexander",
            avatar: "/placeholder.svg?height=80&width=80",
        },
        preview: "Okay. Please review and approve the a...",
        time: "13:02",
        status: "unread",
        unreadCount: 4,
    },
    {
        id: "5",
        sender: {
            name: "Harry Dennis",
            avatar: "/placeholder.svg?height=80&width=80",
            online: true,
        },
        preview: "Hi. We need to discuss changes to the...",
        time: "13:02",
        status: "read",
    },
    {
        id: "6",
        sender: {
            name: "Carolyn Jones",
            avatar: "/placeholder.svg?height=80&width=80",
            online: true,
        },
        preview: "Please report on the tasks completed f...",
        time: "13:02",
        status: "unread",
        unreadCount: 3,
    },
    {
        id: "7",
        sender: {
            name: "Michael Wallace",
            avatar: "/placeholder.svg?height=80&width=80",
        },
        preview: "Make sure that all documents for the c...",
        time: "13:02",
        status: "read",
    },
    {
        id: "8",
        sender: {
            name: "Mark Barnett",
            avatar: "/placeholder.svg?height=80&width=80",
            online: true,
        },
        preview: "Hi. Just a reminder that we have a proj...",
        time: "13:02",
        status: "read",
    },
    {
        id: "9",
        sender: {
            name: "Lucille Baldwin",
            avatar: "/placeholder.svg?height=80&width=80",
        },
        preview: "Good morning, could you please provid...",
        time: "13:02",
        status: "delivered",
    },
]



function ListUser() {
    const [openAdd, setOpenAdd] = useState(false)

    return (
        <div className="flex h-screen w-full flex-col bg-background border-r pt-10">
            <div className="flex justify-end">
                <Button
                    size="sm"
                    className="w-full mx-4 mb-4"
                    variant="outline"
                    onClick={() => setOpenAdd(true)}
                >
                    Thêm mới
                </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
                <div className="flex flex-col">
                    {messages.map((message) => (
                        <UserItem key={message.id} message={message} />
                    ))}
                </div>
            </ScrollArea>

            <ModalAddVoice
                open={openAdd}
                onOpenChange={setOpenAdd}
            />
        </div>
    )
}

export default ListUser