import { useState } from "react";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";

type Challenge = {
  question: string;
  options: number[];
  correctAnswer: number;
};

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateChallenge = (tableNumber: number): Challenge => {
  const factor = getRandomInt(1, 12);
  const useMissingMultiplier = Math.random() < 0.5;

  let question = "";
  let correctAnswer = 0;

  if (useMissingMultiplier) {
    const product = tableNumber * factor;
    question = `${tableNumber} * ? = ${product}`;
    correctAnswer = factor;
  } else {
    question = `${tableNumber} * ${factor} = ?`;
    correctAnswer = tableNumber * factor;
  }

  const options = new Set<number>();
  options.add(correctAnswer);
  while (options.size < 4) {
    const randomOption = correctAnswer + getRandomInt(-10, 10);
    if (randomOption > 0) options.add(randomOption);
  }

  return {
    question,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    correctAnswer,
  };
};

const MathTables: React.FC<{ course: Course }> = ({
  course: { description },
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(2);
  const [mode, setMode] = useState<"view" | "test">("view");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    variant: "success" | "danger";
  } | null>(null);

  const handleViewTable = () => {
    setMode("view");
    setChallenge(null);
    setFeedback(null);
  };

  const handleTestTable = () => {
    setMode("test");
    setFeedback(null);
    setChallenge(generateChallenge(selectedNumber));
  };

  const handleOptionClick = (value: number) => {
    if (!challenge) return;
    if (value === challenge.correctAnswer) {
      setFeedback({ message: "Correct! Well done!", variant: "success" });
    } else {
      setFeedback({
        message: `Incorrect. The correct answer was ${challenge.correctAnswer}.`,
        variant: "danger",
      });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setChallenge(generateChallenge(selectedNumber));
  };

  return (
    <CourseContent>
      <CourseContent.Title description={description} />

      <div className="text-center mb-3">
        <label className="text-white font-medium me-6">Choose a number:</label>
        <select
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(Number(e.target.value))}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mb-3 space-x-6">
        <Button
          variant={mode === "view" ? "outline" : "primary"}
          label="View Table"
          onClick={handleViewTable}
        />
        <Button
          variant={mode === "test" ? "outline" : "primary"}
          label="Test Yourself"
          onClick={handleTestTable}
        />
      </div>

      {/* View Mode */}
      {mode === "view" && (
        <div className="text-left">
          <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Table of {selectedNumber}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
              <div
                key={i}
                className="bg-gray-800 p-1 rounded-lg text-center text-2xl text-white-100"
              >
                {selectedNumber} × {i} = {selectedNumber * i}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Mode */}
      {mode === "test" && challenge && (
        <div className="text-left">
          <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
            What is the answer?
          </h3>
          <CourseContent.Framed>{challenge.question}</CourseContent.Framed>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {challenge.options.map((opt) => (
              <Button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                disabled={!!feedback}
                variant="option"
                label={opt.toString()}
              />
            ))}
          </div>
          {feedback && (
            <div className="mt-4">
              <Feedback message={feedback.message} variant={feedback.variant} />
              <div className="text-center">
                <Button
                  variant="primary"
                  label="Next Question"
                  onClick={handleNext}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </CourseContent>
  );
};

export default MathTables;
