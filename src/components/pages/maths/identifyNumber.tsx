import React, { useState } from "react";
// TODO: Replace with the correct path if the hook exists elsewhere, or implement the hook below if missing.
import { useCallback } from "react";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";

// Simple speech synthesis hook implementation
const useSpeechSynthesis = () => {
  return useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);
};

const IdentifyNumber: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const speak = useSpeechSynthesis();

  const generateQuestion = () => {
    const number = Math.floor(Math.random() * 10); // Random number between 0-9
    const choices = new Set<number>();
    choices.add(number);

    while (choices.size < 4) {
      choices.add(Math.floor(Math.random() * 10));
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
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Identify the Number
      </h1>
      <div className="text-center mb-4">
        <Button onClick={handleSpeak} label="Speak Number" variant="primary" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
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
          message={isCorrect ? "✅ Correct!" : "❌ Try Again!"}
        />
      )}
      <div className="text-center mt-4">
        <Button
          onClick={generateQuestion}
          label="Next Question"
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default IdentifyNumber;
