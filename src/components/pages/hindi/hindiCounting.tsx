import { useState } from "react";
import { hindiNumbers } from "../../../lib/hindi.constants";
import CourseHeadline from "../../ui/courseHeadline";
import { FaVolumeUp } from "react-icons/fa";
import Toast from "../../ui/Toast";

const HindiCounting = () => {
  const [toast, setToast] = useState<string | null>(null);

  const playAudio = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setToast("Speech synthesis not supported in this browser");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    console.log("Utterance created:", utterance);
    utterance.lang = "hi-IN";
    utterance.onerror = () => {
      setToast("Hindi speech not supported in this browser");
    };
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-lg mx-auto rounded-2xl shadow-xl">
      <CourseHeadline description="हिंदी में संख्याओं की पहचान करें।" />
      <ul className="flex flex-col gap-3">
        {Object.entries(hindiNumbers).map(([number, word]) => (
          <li
            key={number}
            className="px-5 py-3 rounded-lg border border-gray-700 font-bold shadow-md flex items-center justify-between"
          >
            <span className="text-xl">{number}</span>
            <span className="text-2xl">{word}</span>
            <button
              onClick={() => playAudio(word)}
              className="text-blue-500 hover:text-blue-700 p-1"
            >
              <FaVolumeUp size={20} />
            </button>
          </li>
        ))}
      </ul>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HindiCounting;
