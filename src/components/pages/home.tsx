import { useState, useEffect } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/home.css";

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

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-[#FFFBF0] font-nunito overflow-x-hidden relative">
      {/* Content */}
      <div className="relative z-10">
        {/* Subject Grid */}
        <div
          className="px-3 pt-9 grid gap-4 animate-slide-up"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            animationDelay: "0s"
          }}
        >
          {subjects.map((subject, i) => {
            return (
              <div
                key={subject.id}
                className="subject-card"
                style={
                  {
                    "--r": subject.rotate,
                    animation: `popIn 0.5s ${i * 0.07}s ease both`,
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
                  className="border-[2px] border-[#2D2016] rounded-[24px] p-3 flex flex-col items-center gap-3 transition-all duration-150"
                  style={{
                    background: subject.bg,
                    boxShadow: `0 6px 0 ${subject.shadow}, 0 6px 0 1px #2D2016`,
                    transform: `rotate(${subject.rotate})`,
                    ...(activeSubject === subject.id
                      ? {
                          transform: `rotate(${subject.rotate}) scale(1.08)`,
                          boxShadow: `0 8px 0 ${subject.shadow}, 0 8px 0 1px #2D2016`
                        }
                      : {})
                  }}
                >
                  <span className="text-5xl leading-none">
                    <Icon icon={subject.icon} width="60" height="60" />
                  </span>
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
          style={{ animationDelay: "0.35s" }}
        >
          <div className="section-label my-5">
            <div className="divider-line" />
            <span className="divider-text">EXPLORE MORE</span>
            <div className="divider-line" />
          </div>

          <div className="flex flex-col gap-3">
            {subjects.slice(0, 3).map((subject, i) => {
              return (
                <div
                  key={subject.id}
                  className="recent-card border-[3px] border-[#2D2016] rounded-[20px] overflow-hidden bg-white transition-all duration-150"
                  style={{
                    boxShadow: `4px 4px 0 ${subject.shadow}, 4px 4px 0 1px #2D2016`,
                    animation: `slideUp 0.4s ${0.5 + i * 0.1}s ease both`,
                    opacity: 0,
                    animationFillMode: "forwards",
                    ...(pressedCard === i
                      ? {
                          transform: "scale(0.97)",
                          boxShadow: `2px 2px 0 ${subject.shadow}`
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
                      style={{ background: subject.bg }}
                    >
                      <Icon icon={subject.icon} width="32" height="32" />
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
