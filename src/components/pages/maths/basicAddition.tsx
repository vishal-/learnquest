import { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import CourseContent from "../../ui/courseContent";
import StreakBadge from "../../ui/streakBadge";
import { useSpeech } from "../../../hooks/useSpeech";
import type { Course } from "../../../types/subject.types";
import ConfettiBurst from "../../ui/confettiBurst";
import mathObjects from "../../../dataset/math.objects.json";

interface MathObject {
  name: string;
  icon: string;
}

const objectToArray = (obj: Record<string, string>): MathObject[] => {
  return Object.entries(obj).map(([name, icon]) => ({
    name,
    icon
  }));
};

const MATH_OBJECTS: MathObject[] = objectToArray(mathObjects);

interface Question {
  num1: number;
  num2: number;
  object: MathObject;
  correctAnswer: number;
}

const generateQuestion = (): Question => {
  const num1 = Math.floor(Math.random() * 9) + 1; // 1-9
  const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
  const sum = num1 + num2;

  // Only generate if sum is <= 20
  if (sum > 20) {
    return generateQuestion();
  }

  const object = MATH_OBJECTS[Math.floor(Math.random() * MATH_OBJECTS.length)];
  return { num1, num2, object, correctAnswer: sum };
};

const generateOptions = (correctAnswer: number): number[] => {
  const options = new Set<number>();
  options.add(correctAnswer);

  while (options.size < 6) {
    const option = Math.floor(Math.random() * 20) + 1;
    if (Math.abs(option - correctAnswer) > 1 || option === correctAnswer) {
      options.add(option);
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

export default function BasicAddition({ course }: { course: Course }) {
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [options, setOptions] = useState<number[]>(
    generateOptions(question.correctAnswer)
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakBadge, setShowStreakBadge] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { playAudio } = useSpeech();

  useEffect(() => {
    const question_text = `Add the ${question.object.name}. ${question.num1} plus ${question.num2}`;
    playAudio(question_text, "en-US");
  }, [question, playAudio]);

  const handleOptionClick = useCallback(
    (option: number) => {
      setSelectedAnswer(option);
      setShowFeedback(true);

      if (option === question.correctAnswer) {
        setShowConfetti(true);
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak % 3 === 0) {
          setShowStreakBadge(true);
        }

        setTimeout(() => {
          setShowConfetti(false);
          handleNextQuestion();
        }, 2000);
      } else {
        setTimeout(() => {
          setStreak(0);
          handleNextQuestion();
        }, 2000);
      }
    },
    [question, streak]
  );

  const handleNextQuestion = () => {
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);
    setOptions(generateOptions(newQuestion.correctAnswer));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <CourseContent course={course}>
      <ConfettiBurst active={showConfetti} />

      {/* Streak Badge */}
      {showStreakBadge && (
        <StreakBadge
          count={streak}
          duration={2000}
          onDismiss={() => setShowStreakBadge(false)}
        />
      )}

      {/* Question Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-poppins font-bold text-[#2D2016] mb-4">
          Add the {question.object.name}! 🎯
        </h2>
      </div>

      {/* Visual Addition */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* First Group */}
          <div className="flex flex-wrap gap-3 max-w-xs justify-center">
            {Array.from({ length: question.num1 }).map((_, i) => (
              <div key={`num1-${i}`} className="text-4xl">
                <Icon icon={question.object.icon} width="48" height="48" />
              </div>
            ))}
          </div>

          {/* Plus Sign */}
          <div className="text-4xl font-bold text-[#2D2016]">+</div>

          {/* Second Group */}
          <div className="flex flex-wrap gap-3 max-w-xs justify-center">
            {Array.from({ length: question.num2 }).map((_, i) => (
              <div key={`num2-${i}`} className="text-4xl">
                <Icon icon={question.object.icon} width="48" height="48" />
              </div>
            ))}
          </div>
        </div>

        {/* Equation Text */}
        <div className="text-center text-xl font-poppins font-bold text-[#2D2016]">
          {question.num1} + {question.num2} = ?
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === question.correctAnswer;

          let buttonClass =
            "bg-white border-3 border-[#2D2016] hover:bg-[#FFF8E7]";
          if (showFeedback) {
            if (isCorrectOption) {
              buttonClass = "bg-[#90EE90] border-3 border-[#2D2016] shadow-lg";
            } else if (isSelected && !isCorrect) {
              buttonClass = "bg-[#FFB6B6] border-3 border-[#2D2016] shadow-lg";
            }
          }

          return (
            <button
              key={option}
              onClick={() => !showFeedback && handleOptionClick(option)}
              disabled={showFeedback}
              className={`p-4 rounded-2xl font-poppins font-bold text-3xl transition-all duration-200 disabled:cursor-not-allowed ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mb-6">
          {isCorrect ? (
            <div className="text-center p-4 bg-[#FFE5E5] rounded-2xl border-3 border-[#2D2016]">
              <p className="text-2xl font-poppins font-bold text-[#2D2016]">
                🎉 Correct! {question.num1} + {question.num2} ={" "}
                {question.correctAnswer}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 bg-[#FFE5E5] rounded-2xl border-3 border-[#2D2016]">
              <p className="text-2xl font-poppins font-bold text-[#2D2016]">
                ❌ Try again! {question.num1} + {question.num2} ={" "}
                {question.correctAnswer}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Streak Counter */}
      <div className="text-center mt-8">
        <p className="text-lg font-poppins font-bold text-[#2D2016]">
          ⭐ Streak: {streak}
        </p>
      </div>
    </CourseContent>
  );
}
