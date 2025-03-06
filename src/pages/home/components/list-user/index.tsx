import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import UserItem from "./components/user-item"
import ModalAddVoice from "./components/modal-add-voice"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getListMember } from "@/api/member"

function ListUser() {
    const [openAdd, setOpenAdd] = useState(false)

    const getListMemberQuery = useQuery({
        queryKey: ["getListMember"],
        queryFn: getListMember
    })

    return (
        <div className="flex h-screen w-full flex-col bg-background border-r pt-4">
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
                    {getListMemberQuery.data?.map((member) => (
                        <UserItem key={member.id} message={member} />
                    ))}
                </div>
            </ScrollArea>

            <ModalAddVoice
                refetch={getListMemberQuery.refetch}
                open={openAdd}
                onOpenChange={setOpenAdd}
            />
        </div>
    )
}

export default ListUser