import React, { useState } from "react";
import type { Course } from "../../../types/subject.types";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";

const ReadTheClock: React.FC<{ course: Course }> = ({
  course: { description }
}) => {
  const [randomHour, setRandomHour] = useState(
    () => Math.floor(Math.random() * 12) + 1
  );
  const [randomMinute, setRandomMinute] = useState(() =>
    Math.floor(Math.random() * 60)
  );
  const [guessedHour, setGuessedHour] = useState("");
  const [guessedMinute, setGuessedMinute] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateNewTime = () => {
    setRandomHour(Math.floor(Math.random() * 12) + 1);
    setRandomMinute(Math.floor(Math.random() * 60));
    setGuessedHour("");
    setGuessedMinute("");
    setFeedback(null);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const hourGuess = parseInt(guessedHour);
    const minuteGuess = parseInt(guessedMinute);

    if (isNaN(hourGuess) || isNaN(minuteGuess)) {
      setFeedback("Please enter both hours and minutes!");
      setIsCorrect(false);
      return;
    }

    if (hourGuess === randomHour && minuteGuess === randomMinute) {
      setFeedback("Great job! That's correct! 🎉");
      setIsCorrect(true);
    } else {
      setFeedback(
        `Not quite right. The correct time is ${randomHour} : ${randomMinute
          .toString()
          .padStart(2, "0")}`
      );
      setIsCorrect(false);
    }
  };

  const hourDegrees = (randomHour % 12) * 30 + randomMinute / 2;
  const minuteDegrees = randomMinute * 6;

  return (
    <CourseContent>
      <CourseContent.Title description={description} />
      {/* Analog Clock */}
      <div className="w-64 h-64 relative mx-auto my-6 rounded-full border-4 border-gray-800 bg-white shadow-lg">
        {/* Clock numbers */}
        {[...Array(12)].map((_, i) => {
          const number = i === 0 ? 12 : i;
          const angle = i * 30;
          const x = Math.sin((angle * Math.PI) / 180) * 90;
          const y = -Math.cos((angle * Math.PI) / 180) * 90;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 text-xl font-bold text-gray-800"
              style={{
                transform: `translate(${x - 8}px, ${y - 12}px)`
              }}
            >
              {number}
            </div>
          );
        })}

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const rotation = i * 30;
          return (
            <div
              key={i}
              className="absolute w-1 h-5 bg-gray-800 left-1/2 top-1"
              style={{
                transformOrigin: "2px 120px",
                transform: `translateX(-50%) rotate(${rotation}deg)`
              }}
            />
          );
        })}

        {/* Hour hand */}
        <div
          className="absolute w-1.5 h-16 bg-gray-800 left-1/2 bottom-1/2 rounded-sm"
          style={{
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${hourDegrees}deg)`
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute w-0.5 h-24 bg-gray-600 left-1/2 bottom-1/2 rounded-sm"
          style={{
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${minuteDegrees}deg)`
          }}
        />

        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-gray-800 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Input section */}
      <div className="mt-6 flex gap-4 justify-center items-center">
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Hours</label>
          <input
            value={guessedHour}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[1-9]$|^1[0-2]$/.test(value)) {
                setGuessedHour(value);
              }
            }}
            min={1}
            max={12}
            className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-2xl font-bold mt-6">:</div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Minutes</label>
          <input
            value={guessedMinute}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (/^[0-5]?[0-9]$/.test(value) && parseInt(value) <= 59)
              ) {
                setGuessedMinute(value);
              }
            }}
            min={0}
            max={59}
            className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-9 text-center">
        <Button
          label="Check Answer"
          variant="secondary"
          onClick={checkAnswer}
        />

        <p>&#160;</p>

        <Button label="New Time" onClick={generateNewTime} />
      </div>

      <p>&#160;</p>

      {feedback && (
        <Feedback
          variant={isCorrect ? "success" : "danger"}
          message={feedback}
        />
      )}
    </CourseContent>
  );
};

export default ReadTheClock;
