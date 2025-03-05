import ListUser from "./components/list-user";
import Chat from "./components/chat";

function Home() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
                <ListUser />
            </div>
            <div className="col-span-3">
                <Chat />
            </div>
        </div>
    )
}

export default Home