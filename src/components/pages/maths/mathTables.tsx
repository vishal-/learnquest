import { useState } from "react";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";

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
  const [mode, setMode] = useState<"none" | "view" | "test">("none");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleViewTable = () => {
    setMode("view");
    setChallenge(null);
    setFeedback("");
  };

  const handleTestTable = () => {
    setMode("test");
    setFeedback("");
    setChallenge(generateChallenge(selectedNumber));
  };

  const handleOptionClick = (value: number) => {
    if (!challenge) return;
    if (value === challenge.correctAnswer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(
        `❌ Incorrect. The correct answer was ${challenge.correctAnswer}.`
      );
    }
  };

  const handleNext = () => {
    setFeedback("");
    setChallenge(generateChallenge(selectedNumber));
  };

  return (
    <CourseContent>
      <CourseContent.Title description={description} />

      <label>
        Choose a number:
        <select
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(Number(e.target.value))}
          style={{ marginLeft: "0.5rem" }}
        >
          {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: "1rem" }}>
        <Button
          variant="outline"
          label="View Table"
          onClick={handleViewTable}
        />
        <span className="mx-3">&#160;</span>
        <Button
          variant="outline"
          label="Test Yourself"
          onClick={handleTestTable}
        />
      </div>

      {/* View Mode */}
      {mode === "view" && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Table of {selectedNumber}</h3>
          <ul>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
              <li key={i}>
                {selectedNumber} × {i} = {selectedNumber * i}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Test Mode */}
      {mode === "test" && challenge && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Test Yourself</h3>
          <p>{challenge.question}</p>
          {challenge.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              style={{ display: "block", margin: "0.25rem 0" }}
              disabled={!!feedback}
            >
              {opt}
            </button>
          ))}
          {feedback && (
            <div style={{ marginTop: "0.5rem" }}>
              <p>{feedback}</p>
              <button onClick={handleNext}>Next</button>
            </div>
          )}
        </div>
      )}
    </CourseContent>
  );
};

export default MathTables;
