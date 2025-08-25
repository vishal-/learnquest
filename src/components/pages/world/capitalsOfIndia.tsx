import React, { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";

const getRandomElements = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

type StateCapitalMap = Record<string, string>;

const CapitalsOfIndia: React.FC<{ course: Course }> = ({
  course: { description },
}) => {
  const [statesAndCapitals, setStatesAndCapitals] = useState<StateCapitalMap>({});
  const [currentState, setCurrentState] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctCapital, setCorrectCapital] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCapitals = async () => {
      const docRef = doc(db, "datasets", "indian-state-capitals");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStatesAndCapitals(docSnap.data() as StateCapitalMap);
      } else {
        console.log("No such document!");
      }
    };

    fetchCapitals();
  }, []);

  const generateQuestion = useCallback(() => {
    if (Object.keys(statesAndCapitals).length === 0) return;

    const states = Object.keys(statesAndCapitals);
    const randomState = states[Math.floor(Math.random() * states.length)];
    const correctAnswer = statesAndCapitals[randomState];
    const capitalsPool = Object.values(statesAndCapitals).filter(
      (c) => c !== correctAnswer
    );
    const wrongOptions = getRandomElements(capitalsPool, 5);
    const allOptions = getRandomElements([...wrongOptions, correctAnswer], 6);

    setCurrentState(randomState);
    setCorrectCapital(correctAnswer);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [statesAndCapitals]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === correctCapital);
  };

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  return (
    <CourseContent>
      <CourseContent.Title description={description} />

      <CourseContent.Framed>{currentState}</CourseContent.Framed>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option) => (
          //   <button
          //     key={option}
          //     onClick={() => handleOptionClick(option)}
          //     className={`px-4 py-2 rounded border transition-all ${
          //       selectedOption
          //         ? option === correctCapital
          //           ? "bg-green-500 text-white"
          //           : option === selectedOption
          //           ? "bg-red-500 text-white"
          //           : "bg-gray-200"
          //         : "bg-blue-100 hover:bg-blue-200"
          //     }`}
          //     disabled={!!selectedOption}
          //   >
          //     {option}
          //   </button>

          <Button
            label={option}
            variant={
              option === selectedOption
                ? isCorrect
                  ? "success"
                  : "danger"
                : "option"
            }
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <Button
          onClick={generateQuestion}
          variant="primary"
          label="Next State"
        />
      </div>

      {selectedOption && (
        <Feedback
          variant={isCorrect ? "success" : "danger"}
          message={isCorrect ? "✅ Correct!" : "❌ Wrong."}
        />
      )}
    </CourseContent>
  );
};

export default CapitalsOfIndia;
