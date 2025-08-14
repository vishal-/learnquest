import { hindiNumbers } from "../../../lib/hindi.constants";
import { FaVolumeUp } from "react-icons/fa";
import Toast from "../../ui/Toast";
import { useSpeech } from "../../../hooks/useSpeech";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/CourseContent";

const HindiCounting: React.FC<{ course: Course }> = ({
  course: { description }
}) => {
  const { playAudio, toast, setToast } = useSpeech();

  return (
    <div className="max-w-lg mx-auto rounded-2xl shadow-xl">
      <CourseContent.Title description={description} />
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
