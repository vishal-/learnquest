import { useState, useCallback, useEffect, useRef } from "react";
import { articles } from "../../../lib/math.constants";
import Button from "../../ui/button";
import CourseContent from "../../ui/courseContent";
import type { Course } from "../../../types/subject.types";

// ─── Constants ─────────────────────────────────────────────────────────────

const ENCOURAGEMENTS = [
  "Amazing! 🎉",
  "Super! ⭐",
  "You got it! 🙌",
  "Brilliant! 🌟",
  "Nailed it! 💥",
  "Perfect! 👏",
  "Awesome! 🚀"
];

const TRIES_AGAIN = [
  "Oops! Try again 🙈",
  "Not quite… 🤔",
  "Almost! Have another go 🔄",
  "Keep trying! 💪"
];

const CONFETTI_COLORS = [
  "#FF6B9D",
  "#FFD93D",
  "#90EE90",
  "#5B9BFF",
  "#FF9F43",
  "#A855F7"
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9;
  utt.pitch = 1.1;
  window.speechSynthesis.speak(utt);
}

// ─── Confetti Component ────────────────────────────────────────────────────

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999
      }}
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const left = `${5 + ((i * 3.5) % 90)}%`;
        const delay = `${(i * 0.04).toFixed(2)}s`;
        const size = `${8 + (i % 5) * 3}px`;
        const rotate = `${(i * 47) % 360}deg`;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "40%",
              left,
              width: size,
              height: size,
              background: color,
              borderRadius: i % 3 === 0 ? "50%" : "3px",
              transform: `rotate(${rotate})`,
              animation: `confettiFall 0.9s ${delay} ease-out forwards`,
              opacity: 0
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong";

export default function Counting1To20({ course }: { course: Course }) {
  const [range, setRange] = useState<20 | 50>(20);
  const [currentCount, setCurrentCount] = useState(0);
  const [currentArticle, setCurrentArticle] = useState("");
  const [options, setOptions] = useState<number[]>([]);
  const [optionStates, setOptionStates] = useState<Record<number, OptionState>>(
    {}
  );
  const [answered, setAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [shakeWrong, setShakeWrong] = useState<number | null>(null);
  const [emojiPop, setEmojiPop] = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateQuestion = useCallback(() => {
    const count = Math.floor(Math.random() * range) + 1;
    const articleNames = Object.keys(articles);
    const randomArticle = randomFrom(articleNames);

    // Generate 4 options
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
    setOptionStates({});
    setAnswered(false);
    setFeedbackMsg("");
    setEmojiPop(true);
    setTimeout(() => setEmojiPop(false), 400);
  }, [range]);

  const readQuestion = () => {
    speak(`Count the ${currentArticle.toLowerCase()}s. How many are there?`);
  };

  // Auto-read on new question
  useEffect(() => {
    if (currentArticle) {
      const timer = setTimeout(readQuestion, 300);
      return () => clearTimeout(timer);
    }
  }, [currentArticle]); // eslint-disable-line

  // Initialize
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (option: number) => {
    if (answered) return;
    setAnswered(true);

    if (option === currentCount) {
      setOptionStates({ [option]: "correct" });
      const msg = randomFrom(ENCOURAGEMENTS);
      setFeedbackMsg(msg);
      setStreak((s) => s + 1);
      setShowConfetti(true);
      speak(msg.replace(/[🎉⭐🙌🌟💥👏🚀]/g, ""));
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 1200);
    } else {
      setOptionStates({ [option]: "wrong", [currentCount]: "correct" });
      const msg = randomFrom(TRIES_AGAIN);
      setFeedbackMsg(msg);
      setStreak(0);
      setShakeWrong(option);
      speak("Not quite, try again!");
      setTimeout(() => setShakeWrong(null), 500);
    }
  };

  const handleNext = () => {
    generateQuestion();
  };

  const emoji = articles[currentArticle as keyof typeof articles] ?? "🔢";

  return (
    <>
      <ConfettiBurst active={showConfetti} />

      <CourseContent>
        <CourseContent.Title description={course.description} />

        {/* Range Selector */}
        <div className="flex justify-center gap-3 mb-6">
          {([20, 50] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRange(r);
                generateQuestion();
              }}
              className={`px-6 py-2 rounded-lg font-poppins font-bold text-sm border-3 border-[#2D2016] transition-all ${
                range === r
                  ? "bg-[#5B9BFF] text-white shadow-[0_4px_0_#2D6FD4]"
                  : "bg-white text-[#2D2016] shadow-[0_3px_0_#2D2016] hover:shadow-[0_2px_0_#2D2016] hover:translate-y-[1px]"
              }`}
            >
              1–{r}
            </button>
          ))}
        </div>

        {/* Streak Badge */}
        {streak > 1 && (
          <div className="flex justify-center mb-6 animate-bounce-scale">
            <div className="bg-[#FFD93D] border-3 border-[#2D2016] rounded-full px-4 py-2 font-poppins font-bold text-sm shadow-[0_3px_0_#C8A800]">
              🔥 {streak} in a row!
            </div>
          </div>
        )}

        {/* Question Card */}
        <CourseContent.Card className="border-4 mb-8">
          {/* Question + Listen Button */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <p className="font-poppins font-bold text-lg text-[#2D2016]">
              How many{" "}
              <span className="text-[#5B9BFF]">
                {currentArticle.toLowerCase()}s
              </span>
              ?
            </p>
            <button
              onClick={readQuestion}
              title="Listen"
              className="flex-shrink-0 bg-[#5B9BFF] text-white border-3 border-[#2D2016] rounded-lg w-12 h-12 flex items-center justify-center text-xl hover:shadow-[0_2px_0_#2D2016] active:translate-y-[2px] active:shadow-[0_1px_0_#2D2016] transition-all"
            >
              🔊
            </button>
          </div>

          {/* Emoji Grid */}
          <div
            className={`bg-[#FFFBF0] border-3 border-[#E5D5B0] rounded-2xl p-4 min-h-[120px] flex flex-wrap justify-center content-center gap-1 ${
              emojiPop ? "animate-pop-in" : ""
            }`}
          >
            {Array.from({ length: currentCount }).map((_, i) => (
              <span
                key={i}
                className={`inline-block leading-tight transition-all ${
                  currentCount > 30
                    ? "text-2xl"
                    : currentCount > 15
                      ? "text-3xl"
                      : "text-4xl"
                }`}
              >
                {emoji}
              </span>
            ))}
          </div>

          <p className="text-center font-nunito font-bold text-xs text-[#9B8B6E] mt-3">
            Tap the right number 👇
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

        {/* Feedback */}
        {feedbackMsg && (
          <div className="text-center space-y-4 mb-8">
            <div className="font-poppins font-bold text-2xl text-[#2D2016]">
              {feedbackMsg}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              className="w-full"
            >
              Next Challenge ✨
            </Button>
          </div>
        )}
      </CourseContent>
    </>
  );
}
