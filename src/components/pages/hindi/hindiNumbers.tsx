import { useState } from "react";
import { hindiNumbers } from "../../../lib/hindi.constants";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/CourseContent";
import Button from "../../ui/Button";
import Toast from "../../ui/Toast";
import { useSpeech } from "../../../hooks/useSpeech";

const convertToHindi = (num: number): string => {
  if (hindiNumbers[num as keyof typeof hindiNumbers])
    return hindiNumbers[num as keyof typeof hindiNumbers];

  let result = "";
  if (num > 100 && num < 1000) {
    const hundreds = Math.floor(num / 100) * 100;
    const remainder = num % 100;
    result += hindiNumbers[hundreds as keyof typeof hindiNumbers] || "";
    if (remainder !== 0) {
      result += " " + convertToHindi(remainder);
    }
    return result;
  }

  return num.toString(); // fallback
};

const HindiNumbers: React.FC<{ course: Course }> = ({
  course: { description }
}) => {
  const [number, setNumber] = useState(generateRandomNumber());
  const { playAudio, toast, setToast } = useSpeech();

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000); // 0–999
  }

  const handleRead = () => {
    const hindiText = convertToHindi(number);
    playAudio(hindiText);
  };

  return (
    <div className="max-w-lg mx-auto">
      <CourseContent.Title description={description} />

      <div className="text-center">
        <CourseContent.Framed>{number}</CourseContent.Framed>

        <Button.Audio onClick={handleRead} label="पढ़ें" />

        <p>&#160;</p>

        <Button
          label=" नयी संख्या"
          onClick={() => setNumber(generateRandomNumber())}
        />
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HindiNumbers;
