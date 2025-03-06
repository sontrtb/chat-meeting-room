import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  function float32ArrayToWav(float32Array: Float32Array, sampleRate = 16000) {
  const numChannels = 1; // Mono
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const wavBuffer = new ArrayBuffer(44 + float32Array.length * bytesPerSample);
  const view = new DataView(wavBuffer);

  // WAV Header
  let offset = 0;
  function writeString(s: string) {
      for (let i = 0; i < s.length; i++) {
          view.setUint8(offset + i, s.charCodeAt(i));
      }
      offset += s.length;
  }

  function writeUint32(value: number) {
      view.setUint32(offset, value, true);
      offset += 4;
  }

  function writeUint16(value: number) {
      view.setUint16(offset, value, true);
      offset += 2;
  }

  writeString("RIFF"); // ChunkID
  writeUint32(36 + float32Array.length * bytesPerSample); // ChunkSize
  writeString("WAVE"); // Format
  writeString("fmt "); // Subchunk1ID
  writeUint32(16); // Subchunk1Size (PCM)
  writeUint16(1); // AudioFormat (PCM)
  writeUint16(numChannels); // NumChannels
  writeUint32(sampleRate); // SampleRate
  writeUint32(byteRate); // ByteRate
  writeUint16(blockAlign); // BlockAlign
  writeUint16(16); // BitsPerSample (16-bit)
  writeString("data"); // Subchunk2ID
  writeUint32(float32Array.length * bytesPerSample); // Subchunk2Size

  // PCM 16-bit conversion
  for (let i = 0; i < float32Array.length; i++) {
      const sample = Math.max(-1, Math.min(1, float32Array[i])); // Clamp between -1 and 1
      view.setInt16(offset, sample * 0x7FFF, true); // Convert to 16-bit PCM
      offset += 2;
  }

  return new Blob([wavBuffer], { type: "audio/wav" });
}

export function blobToFile(blob: Blob, fileName: string) {
    return new File([blob], fileName, { type: blob.type });
}

export async function convertTo16kHz(audioBlob: Blob) {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext();
    
    // Giải mã âm thanh
    const decodedData = await audioContext.decodeAudioData(arrayBuffer);

    // Tạo một AudioContext mới với sampleRate 16000
    const offlineContext = new OfflineAudioContext({
        numberOfChannels: decodedData.numberOfChannels,
        length: Math.ceil(decodedData.length * (16000 / decodedData.sampleRate)),
        sampleRate: 16000
    });

    // Copy dữ liệu vào buffer mới
    const bufferSource = offlineContext.createBufferSource();
    bufferSource.buffer = decodedData;
    bufferSource.connect(offlineContext.destination);
    bufferSource.start();

    // Render lại dữ liệu âm thanh
    const newAudioBuffer = await offlineContext.startRendering();

    // Chuyển buffer thành WAV Blob
    return audioBufferToWavBlob(newAudioBuffer);
}

// Hàm chuyển đổi AudioBuffer thành WAV Blob
function audioBufferToWavBlob(audioBuffer: AudioBuffer) {
    const numOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length * numOfChannels * 2 + 44; // Thêm header WAV

    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    // Hàm hỗ trợ ghi dữ liệu vào buffer
    function writeString(view: DataView<ArrayBuffer>, offset: number, string: string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    // Ghi header WAV
    writeString(view, 0, 'RIFF');
    view.setUint32(4, length - 8, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChannels * 2, true);
    view.setUint16(32, numOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length - 44, true);

    // Ghi dữ liệu âm thanh
    let offset = 44;
    for (let channel = 0; channel < numOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        for (let i = 0; i < channelData.length; i++) {
            const sample = Math.max(-1, Math.min(1, channelData[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }
    }

    return new Blob([buffer], { type: 'audio/wav' });
}
