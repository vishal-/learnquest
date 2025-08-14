import { useState } from "react";
import { hindiNumbers } from "../../../lib/hindi.constants";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/CourseContent";
import Button from "../../ui/Button";

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
  //   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000); // 0–999
  }

  const handleRead = () => {
    if ("speechSynthesis" in window) {
      console.log("yo");
      const hindiText = convertToHindi(number);
      console.log("Hindi Text:", hindiText);
      const utterance = new SpeechSynthesisUtterance(hindiText);
      utterance.lang = "hi-IN";

      const voices = window.speechSynthesis.getVoices();

      console.log("Available Voices:", voices);

      const hindiVoice = voices.find((v) => v.lang === "hi-IN");

      console.log(hindiVoice);

      if (hindiVoice) {
        console.log("Using Hindi voice:", hindiVoice.name);
        utterance.voice = hindiVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support speech synthesis.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <CourseContent.Title description={description} />

      <div className="text-center">
        <CourseContent.Framed>{number}</CourseContent.Framed>

        <button
          onClick={handleRead}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px"
          }}
        >
          पढ़ें
        </button>

        <Button.Audio onClick={handleRead} label="पढ़ें" />

        <button
          onClick={() => setNumber(generateRandomNumber())}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          नया नंबर
        </button>
      </div>
    </div>
  );
};

export default HindiNumbers;
