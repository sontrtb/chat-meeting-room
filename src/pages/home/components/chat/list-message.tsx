import { useEffect, useState } from "react"
import MessageItem from "./message-item"
import { IMessage } from "@/api/message"
import { useGetMessage } from "@/redux/hooks/message"

function ListMessage() {
    const messageCurrent = useGetMessage()

    const [messages, setMessages] = useState<IMessage[]>([])

    const messageLate = messages[messages.length - 1]

    useEffect(() => {
        if (messageCurrent) {
            if(messageCurrent.seg === messageLate?.seg) {
                const newMessLate = {...messageLate, content: messageLate.content + messageCurrent.content};
                const newMessages = [...messages.slice(0, -1), newMessLate];
                setMessages(newMessages)
            } else {
                setMessages(pre => [...pre, messageCurrent])
            }
        }
    }, [messageCurrent])

    return (
        <div className="flex-1 overflow-y-auto p-10 space-y-4">
            {messages.map((message, index) => (
                <MessageItem key={index} message={message} />
            ))}
        </div>
    )
}

export default ListMessage