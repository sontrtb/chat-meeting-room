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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";

interface IModalAddVoice {
    open: boolean;
    onOpenChange: (value: boolean) => void
}

function ModalAddVoice(props: IModalAddVoice) {
    const { open, onOpenChange } = props

    const [step, setStep] = useState(1)

    const [isRecording, setIsRecording] = useState(false);

    const [name, setName] = useState("")
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleRecordToggle = () => {
        setIsRecording(!isRecording);
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    };

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
                const url = URL.createObjectURL(audioBlob);
                console.log("url", url)

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

    const pulseVariants = {
        initial: {
            scale: 1,
            opacity: 0.4,
            backgroundColor: 'rgba(59, 130, 246, 0.4)' // Tailwind blue-500 with opacity
        },
        recording: {
            scale: [1, 1.4, 1.8],
            opacity: [0.4, 0.2, 0.1],
            backgroundColor: [
                'rgba(59, 130, 246, 0.4)',
                'rgba(59, 130, 246, 0.2)',
                'rgba(59, 130, 246, 0.1)'
            ],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const onSubmit = () => {
        if (step === 1) {
            setStep(2)
        } else {
            stopRecording();
            // Todo gửi
            console.log(name, audioBlob)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Thêm tiếng</DialogTitle>
                    <DialogDescription>
                        Bạn hãy thêm tên và giọng nói của mình để bắt đầu
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="name" value={step === 1 ? "name" : "voice"}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="name">Tên</TabsTrigger>
                        <TabsTrigger value="password">Giọng nói</TabsTrigger>
                    </TabsList>
                    <TabsContent value="name">
                        <div className="mt-10">
                            <p className="text-center font-bold mb-4">
                                Nhập tên của bạn
                            </p>
                            <Input
                                id="name"
                                placeholder="Phạm Văn A"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="voice">
                        <div className="mt-10">
                            <p className="text-center font-bold">
                                Nhấn vào micro để thu âm giọng mẫu
                            </p>
                            <div className="flex flex-col items-center justify-center mt-8">
                                <div className="relative flex items-center justify-center">
                                    {isRecording && (
                                        <>
                                            <motion.div
                                                variants={pulseVariants}
                                                initial="initial"
                                                animate="recording"
                                                className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-40"
                                            />
                                            <motion.div
                                                variants={pulseVariants}
                                                initial="initial"
                                                animate="recording"
                                                className="absolute w-24 h-24 bg-blue-500 rounded-full opacity-40 delay-300"
                                            />
                                        </>
                                    )}

                                    <button
                                        onClick={handleRecordToggle}
                                        className={`z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isRecording
                                            ? 'bg-blue-600 text-white animate-pulse'
                                            : 'bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50'
                                            }`}
                                    >
                                        {isRecording ? <Mic /> : <MicOff />}
                                    </button>
                                </div>
                            </div>

                            <p className="text-center text-sm mb-4 mt-10 px-20">
                                <span className="font-bold">Gợi ý</span>: Bí thư Đảng ủy Chính phủ, Thủ tướng Phạm Minh Chính, nhấn mạnh việc sắp xếp đơn vị hành chính cấp tỉnh cần căn cứ trên diện tích, dân số, kinh tế, văn hóa và khả năng hỗ trợ cho nhau để phát triển
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={onSubmit}>{step === 1 ? "Tiếp theo" : "Xác nhận"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddVoice