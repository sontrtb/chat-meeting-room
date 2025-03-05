import InputVoice from "./InputVoice"
import ListMessage from "./list-message"

function Chat() {
  

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-white p-4 shadow-sm">
                <h1 className="font-semibold text-lg">Phòng họp thông minh</h1>
            </div>

            <ListMessage />

            <InputVoice />
        </div>
    )
}


export default Chat