import { hindiNumbers } from "../../../lib/hindi.constants";
import { speak } from "../../../lib/speak";
import CourseContent from "../../ui/courseContent";
import type { Course } from "../../../types/subject.types";

// ─── Main Component ────────────────────────────────────────────────────────

export default function HindiCounting({ course }: { course: Course }) {
  const hindiNumbersArray = Object.entries(hindiNumbers);

  const handleSpeak = (word: string) => {
    speak(word, { language: "hi-IN" });
  };

  return (
    <CourseContent>
      <CourseContent.Title description={course.description} />

      <div className="grid grid-cols-1 gap-3">
        {hindiNumbersArray.map(([number, word], index) => (
          <CourseContent.Card
            key={index}
            className="border-4 flex items-center justify-between p-6 hover:shadow-lg transition-all"
          >
            <div className="flex-1">
              <p className="font-poppins font-bold text-2xl text-[#2D2016] mb-2">
                {number}
              </p>
              <p className="font-poppins font-bold text-xl text-[#5B9BFF]">
                {word}
              </p>
            </div>
            <button
              onClick={() => handleSpeak(word)}
              className="bg-[#5B9BFF] text-white border-4 border-[#2D2016] rounded-2xl w-16 h-16 flex items-center justify-center text-2xl hover:shadow-[0_4px_0_#2D6FD4] active:translate-y-[2px] active:shadow-[0_2px_0_#2D6FD4] transition-all flex-shrink-0 ml-4"
              title={`Listen to ${word}`}
            >
              🔊
            </button>
          </CourseContent.Card>
        ))}
      </div>
    </CourseContent>
  );
}
