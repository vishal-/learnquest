import { useState, useEffect, useCallback, useRef } from "react";
import { speak } from "../../../lib/speak";
import { numberToWords } from "../../../lib/math.constants";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import ConfettiBurst from "../../ui/confettiBurst";
import StreakBadge from "../../ui/streakBadge";
import Button from "../../ui/button";
import type { Course } from "../../../types/subject.types";

// ─── Helpers ───────────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong";

// ─── Main Component ────────────────────────────────────────────────────────

export default function IdentifyNumber({ course }: { course: Course }) {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
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
  const [range, setRange] = useState<number>(10);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateQuestion = useCallback(() => {
    const number = Math.floor(Math.random() * (range + 1));
    const choices = new Set<number>();
    choices.add(number);

    while (choices.size < 4) {
      choices.add(Math.floor(Math.random() * (range + 1)));
    }

    setRandomNumber(number);
    setOptions(Array.from(choices).sort(() => Math.random() - 0.5));
    setOptionStates(new Map());
    setAnswered(false);
    setFeedbackMsg("");
    setShowFeedbackToast(false);
    setFeedbackIsCorrect(null);
    setShowStreakBadge(false);

    // Auto-play the number - speak with delay to ensure voices are ready
    setTimeout(() => {
      console.log(
        "Speaking number:",
        number,
        "as words:",
        numberToWords(number)
      );
      speak(numberToWords(number));
    }, 800);
  }, [range]);

  const handleAnswer = (option: number) => {
    if (answered) return;
    setAnswered(true);

    if (option === randomNumber) {
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
          [randomNumber!, "correct"]
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

  const readQuestion = () => {
    if (randomNumber !== null) {
      console.log(
        "User clicked repeat, speaking:",
        randomNumber,
        "as words:",
        numberToWords(randomNumber)
      );
      speak(numberToWords(randomNumber));
    }
  };

  // Initialize
  useEffect(() => {
    // Ensure voices are loaded before generating first question
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        generateQuestion();
        window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      }
    };

    // Load voices if not already available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      generateQuestion();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    }

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
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

        {/* Range Selector */}
        <div className="text-center mb-9">
          <p className="font-poppins font-bold text-sm text-[#2D2016] mb-4">
            Select Range
          </p>
          <div className="flex justify-center gap-3">
            {[10, 20, 100].map((r) => (
              <Button
                key={r}
                label={`0–${r}`}
                onClick={() => {
                  setRange(r);
                  setStreak(0);
                }}
                variant={range === r ? "primary" : "secondary"}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <CourseContent.Card className="border-4 mb-8">
          <div className="text-center mb-6">
            <p className="font-poppins font-bold text-lg text-[#2D2016] mb-6">
              What number do you hear?
            </p>
            <Button
              onClick={readQuestion}
              label="🔊 Repeat"
              variant="primary"
            />
          </div>
        </CourseContent.Card>

        {/* Options Grid */}
        <CourseContent.OptionsGrid columns={2} className="mb-8">
          {options.map((option) => {
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
