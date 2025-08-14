import { hindiNumbers } from "../../../lib/hindi.constants";
import CourseHeadline from "../../ui/courseHeadline";

const HindiCounting = () => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HindiCounting;
