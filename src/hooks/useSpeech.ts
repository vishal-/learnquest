import { useState } from "react";

export const useSpeech = () => {
  const [toast, setToast] = useState<string | null>(null);

  const playAudio = (text: string, lang: string = "hi-IN") => {
    if (!("speechSynthesis" in window)) {
      setToast("Speech synthesis not supported in this browser");
      return;
    }

    const voices = speechSynthesis.getVoices();
    const targetVoice = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (targetVoice) {
      utterance.voice = targetVoice;
      utterance.lang = lang;
    } else {
      utterance.lang = "en-US";
      setToast(`${lang} voice not available, using English pronunciation`);
    }
    
    utterance.onerror = () => {
      setToast("Speech synthesis failed");
    };
    
    speechSynthesis.speak(utterance);
  };

  return { playAudio, toast, setToast };
};