import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";

interface IModalAddVoice {
    open: boolean;
    onOpenChange: (value: boolean) => void
}

function ModalAddVoice(props: IModalAddVoice) {
    const { open, onOpenChange } = props

    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(audioBlob);
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const saveRecording = () => {
        if (audioBlob) {
            const url = URL.createObjectURL(audioBlob);
            console.log("url", url)
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px]">
                <DialogHeader>
                    <DialogTitle>Thêm tiếng</DialogTitle>
                    <DialogDescription>
                        Bạn hãy thêm tên và giọng nói của mình để bắt đầu
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Label htmlFor="name">
                        Tên
                    </Label>
                    <Input
                        id="name"
                        placeholder="Phạm Văn A"
                    />

                    <div className="flex flex-col items-center justify-center space-y-4 p-4">
                        <div
                            className={`
              p-4 rounded-full cursor-pointer transition-all duration-300
              ${isRecording
                                    ? 'bg-red-500 animate-pulse'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }
            `}
                            onClick={isRecording ? stopRecording : startRecording}
                        >
                            {isRecording ? (
                                <MicOff className="text-white w-12 h-12" />
                            ) : (
                                <Mic className="text-white w-12 h-12" />
                            )}
                        </div>
                        {audioBlob && (
                            <Button
                                onClick={saveRecording}
                                className="mt-4"
                            >
                                Save Recording
                            </Button>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit">Thêm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddVoice