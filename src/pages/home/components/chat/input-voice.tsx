import { Mic, MicOff } from "lucide-react"
import { useMicVAD } from "@ricky0123/vad-react"
import { blobToFile, float32ArrayToWav } from "@/lib/utils"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query";
import sendMessage from "@/api/message";
import { useGetMessage, useSetMessage } from "@/redux/hooks/message";

const pulseVariants = {
    initial: {
        scale: 1,
        opacity: 0.4,
        backgroundColor: 'rgba(59, 130, 246, 0.4)'
    },
    recording: {
        scale: [1, 1.2, 1.3],
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

function InputVoice() {

    const setMessage = useSetMessage()
    const messageCurrent = useGetMessage()

    const sendMessageMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: (res) => {
            setMessage(res)
        }
    })

    const vad = useMicVAD({
        startOnLoad: false,
        onSpeechEnd: (audio) => {
            const wavBuffer = float32ArrayToWav(audio)
            const blob = new Blob([wavBuffer], { type: 'audio/wav' });
            sendMessageMutation.mutate({
                seg: messageCurrent?.seg ?? "",
                file: blobToFile(blob, "voice.wav")
            })
        },
    })

    return (
        <div className="relative flex items-center justify-center border-t p-8">
            {vad.userSpeaking && (
                <>
                    <motion.div
                        variants={pulseVariants}
                        initial="initial"
                        animate="recording"
                        className="absolute w-24 h-24 bg-blue-500 rounded-full opacity-40"
                    />
                    <motion.div
                        variants={pulseVariants}
                        initial="initial"
                        animate="recording"
                        className="absolute w-20 h-20 bg-blue-500 rounded-full opacity-40 delay-300"
                    />
                </>
            )}

            <button
                onClick={vad.toggle}
                className={`z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${vad.userSpeaking
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50'
                    }`}
            >
                {vad.listening ? <Mic /> : <MicOff />}
            </button>
        </div>
    )
}

export default InputVoice