import { useState, useEffect, useCallback, useRef } from "react";
import { units as unitsData } from "../../../lib/units.constants";
import { speak } from "../../../lib/speak";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import ConfettiBurst from "../../ui/confettiBurst";
import StreakBadge from "../../ui/streakBadge";
import type { Course } from "../../../types/subject.types";

// ─── Helpers ───────────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong";

// ─── Main Component ────────────────────────────────────────────────────────

export default function Units({ course }: { course: Course }) {
  const allCategories = Object.keys(unitsData);

  const [currentUnit, setCurrentUnit] = useState("");
  const [correctCategory, setCorrectCategory] = useState("");
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
    // Pick a random category
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];
    setCorrectCategory(randomCategory);

    // Pick a random unit from that category
    const unitsInCategory = unitsData[randomCategory];
    const randomUnit =
      unitsInCategory[Math.floor(Math.random() * unitsInCategory.length)];
    setCurrentUnit(randomUnit);

    // Generate 4 options (correct category + 3 wrong ones)
    const wrongCategories: string[] = [];
    while (wrongCategories.length < 3) {
      const wrong =
        allCategories[Math.floor(Math.random() * allCategories.length)];
      if (wrong !== randomCategory && !wrongCategories.includes(wrong)) {
        wrongCategories.push(wrong);
      }
    }

    const allOptions = [randomCategory, ...wrongCategories].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
    setOptionStates({});
    setAnswered(false);
    setFeedbackMsg("");
    setShowFeedbackToast(false);
    setFeedbackIsCorrect(null);
    setShowStreakBadge(false);

    // Auto-read the unit
    setTimeout(() => {
      speak(randomUnit);
    }, 500);
  }, []);

  const handleAnswer = (category: string) => {
    if (answered) return;
    setAnswered(true);

    if (category === correctCategory) {
      setOptionStates({ [category]: "correct" });
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
      setOptionStates({ [category]: "wrong", [correctCategory]: "correct" });
      const msg = Feedback.getTryAgain();
      setFeedbackMsg(msg);
      setFeedbackIsCorrect(false);
      setStreak(0);
      setShakeWrong(category);
      speak("Not quite, try again!");
      setTimeout(() => setShakeWrong(null), 500);

      setShowFeedbackToast(true);
    }
  };

  const handleFeedbackToastClose = () => {
    setShowFeedbackToast(false);
    generateQuestion();
  };

  const readQuestion = () => {
    speak(currentUnit);
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

        {/* Unit Card */}
        <CourseContent.Card className="border-4 mb-8">
          <div className="text-center mb-6">
            <p className="font-poppins font-bold text-lg text-[#2D2016] mb-6">
              Which category does this unit belong to?
            </p>
            <button
              onClick={readQuestion}
              className="bg-[#5B9BFF] text-white border-4 border-[#2D2016] rounded-2xl w-32 h-32 flex items-center justify-center text-6xl font-poppins font-bold hover:shadow-[0_4px_0_#2D6FD4] active:translate-y-[2px] active:shadow-[0_2px_0_#2D6FD4] transition-all"
              title="Listen to the unit"
            >
              🔊
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#cdb4db] to-[#ffc8dd] rounded-2xl p-6 text-center border-4 border-[#2D2016] mb-4">
            <p className="font-poppins font-bold text-3xl text-[#2D2016]">
              {currentUnit}
            </p>
          </div>

          <p className="text-center font-nunito font-bold text-xs text-[#9B8B6E]">
            Tap the speaker to hear the unit, then select its category 👇
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
