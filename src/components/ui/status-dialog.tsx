import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"
import { CircleCheck } from "lucide-react";

interface IStatusDialog {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    title: string;
    subTitle?: string;
    onOK?: () => void;
    textOk?: string
}

function StatusDialog(props: IStatusDialog) {
    const { isOpen, setIsOpen, textOk, title, onOK, subTitle } = props
    const handleOk = () => {
        onOK?.()
        setIsOpen(false)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[600px]">
                <CircleCheck className="mx-auto text-green-500" width={80} height={80} />
                <p className="text-3xl text-center text-green-500">{title}</p>
                {subTitle &&  <p className="text-center text-gray-500">{subTitle}</p>}
                <DialogFooter>
                    <Button className="w-full mt-3 bg-green-500" onClick={handleOk}>{textOk ?? "OK"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default StatusDialog