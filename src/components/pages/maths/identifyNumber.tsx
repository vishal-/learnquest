import React, { useState, useEffect } from "react";
// TODO: Replace with the correct path if the hook exists elsewhere, or implement the hook below if missing.
import { useCallback } from "react";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import type { Course } from "../../../types/subject.types";

// Simple speech synthesis hook implementation
const useSpeechSynthesis = () => {
  return useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);
};

const IdentifyNumber: React.FC<{ course: Course }> = ({
  course: { label }
}) => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const speak = useSpeechSynthesis();
  const [range, setRange] = useState<number>(10); // Default range is 0-10

  useEffect(() => {
    generateQuestion(); // Set initial question on component load
  }, []);

  const generateQuestion = () => {
    const number = Math.floor(Math.random() * (range + 1)); // Random number within the selected range
    const choices = new Set<number>();
    choices.add(number);

    while (choices.size < 4) {
      choices.add(Math.floor(Math.random() * (range + 1)));
    }

    setRandomNumber(number);
    setOptions(Array.from(choices).sort(() => Math.random() - 0.5)); // Shuffle options
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsCorrect(option === randomNumber);
  };

  const handleSpeak = () => {
    if (randomNumber !== null) {
      speak(randomNumber.toString());
    }
  };

  return (
    <CourseContent>
      <CourseContent.Title description={label} />
      <div className="text-center mb-3">
        <div className="flex justify-center space-x-4 mb-9">
          <label>
            <input
              type="radio"
              name="range"
              value="10"
              className="me-2"
              checked={range === 10}
              onChange={() => setRange(10)}
            />
            0-10
          </label>
          <label>
            <input
              type="radio"
              name="range"
              value="20"
              className="me-2"
              checked={range === 20}
              onChange={() => setRange(20)}
            />
            0-20
          </label>
          <label>
            <input
              type="radio"
              name="range"
              value="100"
              className="me-2"
              checked={range === 100}
              onChange={() => setRange(100)}
            />
            0-100
          </label>
        </div>

        <Button
          onClick={handleSpeak}
          label="🔊 Speak Number"
          variant="primary"
        />
        <div className="mb-9 text-lg font-medium">&#160;</div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-9">
        {options.map((option) => (
          <Button
            key={option}
            label={option.toString()}
            onClick={() => handleOptionClick(option)}
            variant={
              selectedOption !== null
                ? option === randomNumber
                  ? "success"
                  : option === selectedOption
                  ? "danger"
                  : "option"
                : "option"
            }
            disabled={selectedOption !== null}
          />
        ))}
      </div>
      {isCorrect !== null && (
        <Feedback
          variant={isCorrect ? "success" : "danger"}
          message={isCorrect ? "🎉 Correct! Great Job!" : "❌ Oops! Try Again!"}
        />
      )}
      <div className="text-center mt-12">
        <Button
          onClick={generateQuestion}
          label="🔄 Next Question"
          variant="secondary"
        />
      </div>
    </CourseContent>
  );
};

export default IdentifyNumber;
