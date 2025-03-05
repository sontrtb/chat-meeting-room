import { Mic } from "lucide-react"
import { useMicVAD } from "@ricky0123/vad-react"
import { float32ArrayToWav } from "@/lib/utils"

function InputVoice() {

    const vad = useMicVAD({
        onSpeechEnd: (audio) => {
            const wavBuffer = float32ArrayToWav(audio)
            const blob = new Blob([wavBuffer], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);

            console.log(url)
        },
    })

    return (
        <div>
            <button>
                <Mic />
            </button>
            <div>{vad.userSpeaking && "User is speaking"}</div>
        </div>
    )
}

export default InputVoice