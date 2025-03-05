import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  function float32ArrayToWav(float32Array, sampleRate = 16000) {
  const numChannels = 1; // Mono
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const wavBuffer = new ArrayBuffer(44 + float32Array.length * bytesPerSample);
  const view = new DataView(wavBuffer);

  // WAV Header
  let offset = 0;
  function writeString(s) {
      for (let i = 0; i < s.length; i++) {
          view.setUint8(offset + i, s.charCodeAt(i));
      }
      offset += s.length;
  }

  function writeUint32(value) {
      view.setUint32(offset, value, true);
      offset += 4;
  }

  function writeUint16(value) {
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


