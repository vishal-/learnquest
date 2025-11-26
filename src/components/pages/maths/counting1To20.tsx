import { useState, useCallback, useEffect } from "react";
import { articles } from "../../../lib/math.constants";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import type { Course } from "../../../types/subject.types";

export default function Counting1To20({ course }: { course: Course }) {
  const [range, setRange] = useState(20);
  const [currentCount, setCurrentCount] = useState(0);
  const [currentArticle, setCurrentArticle] = useState("");
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = useCallback(() => {
    const count = Math.floor(Math.random() * range) + 1;
    const articleNames = Object.keys(articles);
    const randomArticle =
      articleNames[Math.floor(Math.random() * articleNames.length)];

    // Generate 4 options including the correct answer
    const wrongOptions: number[] = [];
    while (wrongOptions.length < 3) {
      const wrong = Math.floor(Math.random() * range) + 1;
      if (wrong !== count && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    const allOptions = [count, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentCount(count);
    setCurrentArticle(randomArticle);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [range]);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsCorrect(option === currentCount);
  };

  // Initialize first question
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  return (
    <CourseContent>
      <CourseContent.Title description={course.description} />
      
      <div className="mb-6 text-center">
        <div className="flex justify-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="range"
              value="20"
              checked={range === 20}
              onChange={() => setRange(20)}
            />
            1-20
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="range"
              value="50"
              checked={range === 50}
              onChange={() => setRange(50)}
            />
            1-50
          </label>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg mb-4">
          Count the {currentArticle.toLowerCase()}s:
        </p>
        <CourseContent.Framed>
          <div className="text-4xl flex flex-wrap justify-center gap-1">
            {Array.from({ length: currentCount }, (_, i) => (
              <span key={i}>
                {articles[currentArticle as keyof typeof articles]}
              </span>
            ))}
          </div>
        </CourseContent.Framed>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option) => (
          <Button
            key={option}
            label={option.toString()}
            variant={
              selectedOption !== null
                ? option === currentCount
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
        <Button onClick={generateQuestion} variant="primary" label="Next" />
      </div>
    </CourseContent>
  );
}
