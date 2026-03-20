import { useState, useCallback, useEffect, useRef } from "react";
import { hindiNumbers } from "../../../lib/hindi.constants";
import { speak } from "../../../lib/speak";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import ConfettiBurst from "../../ui/confettiBurst";
import StreakBadge from "../../ui/streakBadge";
import type { Course } from "../../../types/subject.types";

// ─── Helpers ───────────────────────────────────────────────────────────────

const convertToHindi = (num: number): string => {
  if (hindiNumbers[num as keyof typeof hindiNumbers])
    return hindiNumbers[num as keyof typeof hindiNumbers];

  let result = "";
  if (num > 100 && num < 1000) {
    const hundreds = Math.floor(num / 100) * 100;
    const remainder = num % 100;
    result += hindiNumbers[hundreds as keyof typeof hindiNumbers] || "";
    if (remainder !== 0) {
      result += " " + convertToHindi(remainder);
    }
    return result;
  }

  return num.toString();
};

// ─── Main Component ────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong";

export default function HindiNumbers({ course }: { course: Course }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [optionStates, setOptionStates] = useState<Record<number, OptionState>>(
    {}
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
    const number = Math.floor(Math.random() * 1000);
    setCurrentNumber(number);

    // Generate 4 options including the correct answer
    const wrongOptions: number[] = [];
    while (wrongOptions.length < 3) {
      const wrong = Math.floor(Math.random() * 1000);
      if (wrong !== number && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    const allOptions = [number, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
    setOptionStates({});
    setAnswered(false);
    setFeedbackMsg("");
    setShowFeedbackToast(false);
    setFeedbackIsCorrect(null);
    setShowStreakBadge(false);

    // Auto-play the hindi number
    setTimeout(() => {
      const hindiText = convertToHindi(number);
      speak(hindiText, { language: "hi-IN" });
    }, 500);
  }, []);

  const handleAnswer = (option: number) => {
    if (answered) return;
    setAnswered(true);

    if (option === currentNumber) {
      setOptionStates({ [option]: "correct" });
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
      setOptionStates({ [option]: "wrong", [currentNumber]: "correct" });
      const msg = Feedback.getTryAgain();
      setFeedbackMsg(msg);
      setFeedbackIsCorrect(false);
      setStreak(0);
      setShakeWrong(option);
      speak("Not quite, try again!", { language: "hi-IN" });
      setTimeout(() => setShakeWrong(null), 500);

      setShowFeedbackToast(true);
    }
  };

  const handleFeedbackToastClose = () => {
    setShowFeedbackToast(false);
    generateQuestion();
  };

  const readQuestion = () => {
    const hindiText = convertToHindi(currentNumber);
    speak(hindiText, { language: "hi-IN" });
  };

  // Initialize
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  return (
    <>
      <ConfettiBurst active={showConfetti} />

      <CourseContent>
        <CourseContent.Title description={course.description} />

        {/* Streak Badge */}
        {showStreakBadge && (
          <StreakBadge
            count={streak}
            duration={2000}
            onDismiss={() => setShowStreakBadge(false)}
          />
        )}

        {/* Hindi Number Card */}
        <CourseContent.Card className="border-4 mb-8">
          <div className="text-center mb-6">
            <p className="font-poppins font-bold text-lg text-[#2D2016] mb-6">
              Which number is this?
            </p>
            <button
              onClick={readQuestion}
              className="bg-[#5B9BFF] text-white border-4 border-[#2D2016] rounded-2xl w-32 h-32 flex items-center justify-center text-6xl font-poppins font-bold hover:shadow-[0_4px_0_#2D6FD4] active:translate-y-[2px] active:shadow-[0_2px_0_#2D6FD4] transition-all"
              title="Listen to the number"
            >
              🔊
            </button>
          </div>

          <p className="text-center font-nunito font-bold text-xs text-[#9B8B6E] mt-3">
            Tap the speaker to hear the number, then select it below 👇
          </p>
        </CourseContent.Card>

        {/* Options Grid */}
        <CourseContent.OptionsGrid columns={2} className="mb-8">
          {options.map((option) => {
            const state = optionStates[option] ?? "idle";
            const isWrong = shakeWrong === option && state === "wrong";

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`
                  w-full py-6 rounded-2xl border-4 font-poppins font-bold text-2xl
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
      </CourseContent>

      {/* Toast Feedback */}
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
    </>
  );
}
