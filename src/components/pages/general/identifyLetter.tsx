import { useState, useCallback, useEffect } from "react";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import type { Course } from "../../../types/subject.types";

export default function IdentifyLetter({ course }: { course: Course }) {
  const [currentLetter, setCurrentLetter] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = useCallback(() => {
    const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z

    // Generate 4 options including the correct answer
    const wrongOptions: string[] = [];
    while (wrongOptions.length < 3) {
      const wrong = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      if (wrong !== letter && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    const allOptions = [letter, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setCurrentLetter(letter);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === currentLetter);
  };

  const handleSpeak = () => {
    if (currentLetter && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentLetter);
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  return (
    <CourseContent>
      <CourseContent.Title description={course.description} />

      <div className="text-center mb-12">
        <Button
          onClick={handleSpeak}
          label="🔊 Play Letter"
          variant="primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option) => (
          <Button
            key={option}
            label={option.toUpperCase()}
            variant={
              selectedOption !== null
                ? option === currentLetter
                  ? "success"
                  : option === selectedOption
                  ? "danger"
                  : "option"
                : "option"
            }
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
          />
        ))}
      </div>

      {selectedOption && (
        <Feedback
          variant={isCorrect ? "success" : "danger"}
          message={isCorrect ? "✅ Correct!" : "❌ Try again!"}
        />
      )}

      <div className="text-center mt-9">
        <Button onClick={generateQuestion} variant="secondary" label="Next" />
      </div>
    </CourseContent>
  );
}
