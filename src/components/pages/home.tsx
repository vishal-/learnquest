import { useState, useEffect } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

// Subject color mappings with emojis
const subjectConfig: Record<
  string,
  { emoji: string; bg: string; shadow: string; rotate: string }
> = {
  general: {
    emoji: "🧠",
    bg: "#FF6B6B",
    shadow: "#C94B4B",
    rotate: "-3deg"
  },
  hindi: {
    emoji: "🪔",
    bg: "#FF9F43",
    shadow: "#C97A20",
    rotate: "2deg"
  },
  maths: {
    emoji: "🔢",
    bg: "#48CFAD",
    shadow: "#2A9D7A",
    rotate: "-2deg"
  },
  stem: {
    emoji: "🔬",
    bg: "#5B9BFF",
    shadow: "#2D6FD4",
    rotate: "3deg"
  },
  world: {
    emoji: "🌍",
    bg: "#A78BFA",
    shadow: "#7C5DC9",
    rotate: "-1deg"
  }
};

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        className={`text-sm ${i <= count ? "opacity-100" : "opacity-25"}`}
      >
        ⭐
      </span>
    ))}
  </div>
);

const HomePage = () => {
  const { subjects } = useSubjects();
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [pressedCard, setPressedCard] = useState<number | null>(null);

  useEffect(() => {
    setActiveSubject(null);
  }, []);

  const getSubjectConfig = (id: string) => {
    const key = id.toLowerCase();
    return (
      subjectConfig[key] || {
        emoji: "📚",
        bg: "#A78BFA",
        shadow: "#7C5DC9",
        rotate: "0deg"
      }
    );
  };

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-[#FFFBF0] font-nunito overflow-x-hidden relative">
      {/* Decorative dots background */}
      <div className="fixed inset-0 max-w-[430px] mx-auto dot-background opacity-50 pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="px-5 pt-5 animate-slide-up">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-nunito text-[14px] font-bold text-[#9B8B6E] m-0 tracking-[0.5px] uppercase">
                Good morning! 👋
              </p>
              <h1 className="font-fredoka text-[30px] text-[#2D2016] m-0 mt-0.5 tracking-[0.5px] leading-tight">
                What shall we
                <br />
                learn today?
              </h1>
            </div>

            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-[#FFD93D] border-[3px] border-[#2D2016] shadow-[3px_3px_0_#2D2016] flex items-center justify-center text-2xl flex-shrink-0">
              🦊
            </div>
          </div>
        </div>

        {/* Divider label */}
        <div
          className="px-5 pt-6 pb-1 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="section-label">
            <div className="divider-line" />
            <span className="divider-text">SUBJECTS</span>
            <div className="divider-line" />
          </div>
        </div>

        {/* Subject Grid */}
        <div
          className="px-5 pt-4 pb-2 grid gap-4 animate-slide-up"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            animationDelay: "0.15s"
          }}
        >
          {subjects.map((subject, i) => {
            const config = getSubjectConfig(subject.id);
            return (
              <div
                key={subject.id}
                className="subject-card"
                style={
                  {
                    "--r": config.rotate,
                    animation: `popIn 0.5s ${0.15 + i * 0.07}s ease both`,
                    opacity: 0,
                    animationFillMode: "forwards"
                  } as React.CSSProperties
                }
                onClick={() => {
                  setActiveSubject(subject.id);
                  navigate(subject.route);
                }}
              >
                <div
                  className="border-[3px] border-[#2D2016] rounded-[24px] p-6 flex flex-col items-center gap-3 transition-all duration-150"
                  style={{
                    background: config.bg,
                    boxShadow: `0 6px 0 ${config.shadow}, 0 6px 0 1px #2D2016`,
                    transform: `rotate(${config.rotate})`,
                    ...(activeSubject === subject.id
                      ? {
                          transform: `rotate(${config.rotate}) scale(1.08)`,
                          boxShadow: `0 8px 0 ${config.shadow}, 0 8px 0 1px #2D2016`
                        }
                      : {})
                  }}
                >
                  <span className="text-5xl leading-none">{config.emoji}</span>
                  <span className="font-fredoka text-[13px] text-white tracking-[0.3px] text-shadow text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {subject.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity - Showing subject descriptions as a teaser */}
        <div
          className="px-5 pb-5 animate-slide-up"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="section-label mb-3.5">
            <div className="divider-line" />
            <span className="divider-text">EXPLORE MORE</span>
            <div className="divider-line" />
          </div>

          <div className="flex flex-col gap-3">
            {subjects.slice(0, 3).map((subject, i) => {
              const config = getSubjectConfig(subject.id);
              return (
                <div
                  key={subject.id}
                  className="recent-card border-[3px] border-[#2D2016] rounded-[20px] overflow-hidden bg-white transition-all duration-150"
                  style={{
                    boxShadow: `4px 4px 0 ${config.shadow}, 4px 4px 0 1px #2D2016`,
                    animation: `slideUp 0.4s ${0.7 + i * 0.1}s ease both`,
                    opacity: 0,
                    animationFillMode: "forwards",
                    ...(pressedCard === i
                      ? {
                          transform: "scale(0.97)",
                          boxShadow: `2px 2px 0 ${config.shadow}`
                        }
                      : {})
                  }}
                  onPointerDown={() => setPressedCard(i)}
                  onPointerUp={() => setPressedCard(null)}
                  onPointerLeave={() => setPressedCard(null)}
                  onClick={() => navigate(subject.route)}
                >
                  <div className="flex items-center">
                    {/* Color strip */}
                    <div
                      className="w-16 flex items-center justify-center text-[28px] flex-shrink-0 border-r-[3px] border-[#2D2016]"
                      style={{ background: config.bg }}
                    >
                      {config.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="font-nunito font-black text-[11px] text-[#9B8B6E] uppercase tracking-[0.5px]">
                            {subject.label}
                          </span>
                          <p className="font-fredoka text-base text-[#2D2016] m-0 mt-0.5 mb-1.5 leading-tight">
                            {subject.courses && subject.courses.length > 0
                              ? `${subject.courses.length} Course${subject.courses.length !== 1 ? "s" : ""}`
                              : "Explore Now"}
                          </p>
                        </div>
                        <StarRating
                          count={Math.min(
                            3,
                            (subject.courses?.length || 0) + 1
                          )}
                        />
                      </div>

                      <p className="font-nunito font-semibold text-[12px] text-gray-600 m-0 leading-tight">
                        {subject.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default HomePage;
