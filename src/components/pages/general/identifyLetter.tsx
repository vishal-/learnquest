import { useState, useCallback, useEffect, useRef } from "react";
import { speak } from "../../../lib/speak";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import ConfettiBurst from "../../ui/confettiBurst";
import StreakBadge from "../../ui/streakBadge";
import type { Course } from "../../../types/subject.types";

// ─── Helpers ───────────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong";

// ─── Main Component ────────────────────────────────────────────────────────

export default function IdentifyLetter({ course }: { course: Course }) {
  const [currentLetter, setCurrentLetter] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionStates, setOptionStates] = useState<Record<string, OptionState>>(
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
  const [shakeWrong, setShakeWrong] = useState<string | null>(null);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateQuestion = useCallback(() => {
    const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z

    // Generate 4 options including the correct answer
    const wrongOptions: string[] = [];
    while (wrongOptions.length < 3) {
      const wrong = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      if (wrong !== letter && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    const allOptions = [letter, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setCurrentLetter(letter);
    setOptions(allOptions);
    setOptionStates({});
    setAnswered(false);
    setFeedbackMsg("");
    setShowFeedbackToast(false);
    setFeedbackIsCorrect(null);
    setShowStreakBadge(false);

    // Auto-play the letter
    setTimeout(() => {
      speak(letter, { rate: 0.7 });
    }, 500);
  }, []);

  const handleAnswer = (option: string) => {
    if (answered) return;
    setAnswered(true);

    if (option === currentLetter) {
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
      // speak(msg.replace(/[🎉⭐🙌🌟💥👏🚀🧡🧠🎊]/g, ""));
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 1200);

      setTimeout(() => {
        setShowFeedbackToast(true);
      }, 300);
    } else {
      setOptionStates({ [option]: "wrong", [currentLetter]: "correct" });
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

  const handleSpeak = () => {
    if (currentLetter) {
      speak(currentLetter, { rate: 0.7 });
    }
  };

  // Initialize
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

        {/* Letter Card */}
        <CourseContent.Card className="border-4 mb-8">
          <div className="text-center mb-6">
            <p className="font-poppins font-bold text-lg text-[#2D2016] mb-4">
              Find the letter:
            </p>
            <button
              onClick={handleSpeak}
              className="bg-[#5B9BFF] text-white border-4 border-[#2D2016] rounded-2xl w-24 h-24 flex items-center justify-center text-5xl font-poppins font-bold hover:shadow-[0_4px_0_#2D6FD4] active:translate-y-[2px] active:shadow-[0_2px_0_#2D6FD4] transition-all"
              title="Listen to the letter"
            >
              🔊
            </button>
          </div>

          <p className="text-center font-nunito font-bold text-xs text-[#9B8B6E] mt-3">
            Tap the correct letter 👇
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
                  w-full py-6 rounded-2xl border-4 font-poppins font-bold text-3xl
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
                {option.toUpperCase()}
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
