import { useState, useEffect, useCallback, useRef } from "react";
import { speak } from "../../../lib/speak";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import ConfettiBurst from "../../ui/confettiBurst";
import StreakBadge from "../../ui/streakBadge";
import Select from "../../ui/select";
import type { Course } from "../../../types/subject.types";

// ─── Helpers ───────────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong";

type Challenge = {
  tableNumber: number;
  multiplier: number;
  correctAnswer: number;
  question: string;
  options: number[];
};

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateChallenge = (tableNumber: number): Challenge => {
  const multiplier = getRandomInt(1, 12);
  const correctAnswer = tableNumber * multiplier;

  const options = new Set<number>();
  options.add(correctAnswer);
  while (options.size < 4) {
    const randomOption = correctAnswer + getRandomInt(-15, 15);
    if (randomOption > 0) options.add(randomOption);
  }

  return {
    tableNumber,
    multiplier,
    correctAnswer,
    question: `${tableNumber} × ${multiplier} = ?`,
    options: Array.from(options).sort(() => Math.random() - 0.5)
  };
};

// ─── Main Component ────────────────────────────────────────────────────────

export default function PracticeTables({ course }: { course: Course }) {
  const [selectedNumber, setSelectedNumber] = useState<number>(2);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [optionStates, setOptionStates] = useState<Map<number, OptionState>>(
    new Map()
  );
  const [answered, setAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showFeedbackToast, setShowFeedbackToast] = useState(false);
  const [feedbackIsCorrect, setFeedbackIsCorrect] = useState<boolean | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakBadge, setShowStreakBadge] = useState(false);
  const [shakeWrong, setShakeWrong] = useState<number | null>(null);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateQuestion = useCallback(() => {
    const newChallenge = generateChallenge(selectedNumber);
    setChallenge(newChallenge);
    setOptionStates(new Map());
    setAnswered(false);
    setFeedbackMsg("");
    setShowFeedbackToast(false);
    setFeedbackIsCorrect(null);
    setShowStreakBadge(false);
  }, [selectedNumber]);

  const handleAnswer = (option: number) => {
    if (answered || !challenge) return;
    setAnswered(true);

    if (option === challenge.correctAnswer) {
      setOptionStates(new Map([[option, "correct"]]));
      const msg = Feedback.getEncouragement();
      setFeedbackMsg(msg);
      setFeedbackIsCorrect(true);
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > 1) {
          setShowStreakBadge(true);
        }
        return newStreak;
      });
      setShowConfetti(true);
      speak(msg.replace(/[🎉⭐🙌🌟💥👏🚀🧡🧠🎊]/g, ""));
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 1200);

      setTimeout(() => {
        setShowFeedbackToast(true);
      }, 300);
    } else {
      setOptionStates(
        new Map([
          [option, "wrong"],
          [challenge.correctAnswer, "correct"]
        ])
      );
      const msg = Feedback.getTryAgain();
      setFeedbackMsg(msg);
      setFeedbackIsCorrect(false);
      setStreak(0);
      setShakeWrong(option);
      speak("Not quite, try again!");
      setTimeout(() => setShakeWrong(null), 500);

      setShowFeedbackToast(true);
    }
  };

  const handleFeedbackToastClose = () => {
    setShowFeedbackToast(false);
    generateQuestion();
  };

  // Initialize on mount
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  return (
    <>
      <ConfettiBurst active={showConfetti} />

      <CourseContent>
        <CourseContent.Title
          title={course.label}
          description={course.description}
        />

        {/* Streak Badge */}
        {showStreakBadge && (
          <StreakBadge
            count={streak}
            duration={2000}
            onDismiss={() => setShowStreakBadge(false)}
          />
        )}

        {/* Table Selector */}
        <div className="text-center">
          <p className="font-poppins font-bold text-sm text-[#2D2016] mb-4">
            Select a table to practice:
          </p>
          <div className="mb-6 max-w-xs mx-auto">
            <Select
              label=""
              options={Array.from({ length: 19 }, (_, i) => ({
                label: (i + 2).toString(),
                value: i + 2
              }))}
              value={selectedNumber}
              onChange={(value) => {
                setSelectedNumber(Number(value));
                setStreak(0);
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        {challenge && (
          <>
            <CourseContent.Card className="border-4 mb-8">
              <div className="text-center mb-6">
                <p className="font-poppins font-bold text-lg text-[#2D2016] mb-6">
                  Solve this:
                </p>
                <div className="bg-gradient-to-r from-[#cdb4db] to-[#ffc8dd] rounded-2xl p-6 text-center border-4 border-[#2D2016]">
                  <p className="font-poppins font-bold text-2xl text-[#2D2016]">
                    {selectedNumber} × {challenge.multiplier} = ?
                  </p>
                </div>
              </div>
            </CourseContent.Card>

            {/* Options Grid */}
            <CourseContent.OptionsGrid columns={2} className="mb-8">
              {challenge.options.map((option) => {
                const state = optionStates.get(option) ?? "idle";
                const isWrong = shakeWrong === option && state === "wrong";

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                    className={`
                      w-full py-6 rounded-2xl border-4 font-poppins font-bold text-lg
                      transition-all duration-100 cursor-pointer
                      disabled:cursor-not-allowed
                      flex items-center justify-center
                      ${
                        state === "correct"
                          ? "bg-[#90EE90] text-white border-[#2D8C40] shadow-[0_4px_0_#2D8C40] scale-105"
                          : state === "wrong"
                            ? "bg-[#FF6B6B] text-white border-[#C94B4B] shadow-[0_4px_0_#C94B4B]"
                            : "bg-white text-[#2D2016] border-[#2D2016] shadow-[0_4px_0_#2D2016] hover:shadow-[0_3px_0_#2D2016] hover:translate-y-[1px]"
                      }
                      ${isWrong ? "animate-shake" : ""}
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </CourseContent.OptionsGrid>
          </>
        )}

        {/* Feedback Toast */}
        {feedbackIsCorrect === true && (
          <Feedback.ToastCorrect
            isVisible={showFeedbackToast}
            message={feedbackMsg}
            onClose={handleFeedbackToastClose}
            duration={2000}
          />
        )}
        {feedbackIsCorrect === false && (
          <Feedback.ToastIncorrect
            isVisible={showFeedbackToast}
            message={feedbackMsg}
            onClose={handleFeedbackToastClose}
            duration={2000}
          />
        )}
      </CourseContent>
    </>
  );
}
