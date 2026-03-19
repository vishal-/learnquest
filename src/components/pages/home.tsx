import { useState, useEffect } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { useNavigate } from "react-router-dom";

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
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        style={{ fontSize: "14px", opacity: i <= count ? 1 : 0.25 }}
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
    // Trigger animation on mount
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
    <div
      style={{
        minHeight: "100dvh",
        maxWidth: "430px",
        margin: "0 auto",
        background: "#FFFBF0",
        fontFamily: "'Nunito', 'Fredoka One', sans-serif",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');

        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--r)); }
          50% { transform: translateY(-6px) rotate(var(--r)); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(var(--r)); }
          25% { transform: rotate(calc(var(--r) + 6deg)); }
          75% { transform: rotate(calc(var(--r) - 6deg)); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.5) rotate(var(--r)); opacity: 0; }
          70% { transform: scale(1.1) rotate(var(--r)); }
          100% { transform: scale(1) rotate(var(--r)); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .subject-card {
          cursor: pointer;
          transition: transform 0.15s ease;
          user-select: none;
        }
        .subject-card:active {
          transform: scale(0.92) rotate(var(--r)) !important;
        }

        .recent-card {
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .recent-card:active {
          transform: scale(0.97) !important;
        }

        .progress-bar {
          background: rgba(0,0,0,0.12);
          border-radius: 999px;
          overflow: hidden;
          height: 10px;
        }
        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.8), rgba(255,255,255,0.4));
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      {/* Decorative dots background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          maxWidth: "430px",
          margin: "0 auto",
          backgroundImage:
            "radial-gradient(circle, #e2d9c8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 0",
            animation: "slideUp 0.5s ease both"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#9B8B6E",
                  margin: 0,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}
              >
                Good morning! 👋
              </p>
              <h1
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "30px",
                  color: "#2D2016",
                  margin: "2px 0 0",
                  letterSpacing: "0.5px",
                  lineHeight: 1.1
                }}
              >
                What shall we
                <br />
                learn today?
              </h1>
            </div>

            {/* Avatar */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#FFD93D",
                border: "3px solid #2D2016",
                boxShadow: "3px 3px 0 #2D2016",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                flexShrink: 0
              }}
            >
              🦊
            </div>
          </div>

          {/* XP bar */}
          <div
            style={{
              marginTop: "16px",
              background: "#FFF3D0",
              border: "2.5px solid #2D2016",
              borderRadius: "16px",
              padding: "10px 14px",
              boxShadow: "3px 3px 0 #2D2016",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <span style={{ fontSize: "20px" }}>⚡</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px"
                }}
              >
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: "12px",
                    color: "#2D2016"
                  }}
                >
                  Level 5 — Explorer
                </span>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#9B8B6E"
                  }}
                >
                  340 / 500 XP
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "68%", background: "#FFD93D" }}
                />
              </div>
            </div>
            <span
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: "16px",
                color: "#FF6B6B",
                whiteSpace: "nowrap"
              }}
            >
              🔥 7
            </span>
          </div>
        </div>

        {/* Divider label */}
        <div
          style={{
            padding: "24px 20px 4px",
            animation: "slideUp 0.5s 0.1s ease both",
            opacity: 0,
            animationFillMode: "forwards"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                flex: 1,
                height: "2.5px",
                background: "#E8DCC8",
                borderRadius: "2px"
              }}
            />
            <span
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: "15px",
                color: "#9B8B6E",
                letterSpacing: "0.5px"
              }}
            >
              SUBJECTS
            </span>
            <div
              style={{
                flex: 1,
                height: "2.5px",
                background: "#E8DCC8",
                borderRadius: "2px"
              }}
            />
          </div>
        </div>

        {/* Subject Grid */}
        <div
          style={{
            padding: "12px 20px 4px",
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(subjects.length, 5)}, 1fr)`,
            gap: "10px",
            animation: "slideUp 0.5s 0.15s ease both",
            opacity: 0,
            animationFillMode: "forwards"
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
                  style={{
                    background: config.bg,
                    border: "3px solid #2D2016",
                    borderRadius: "20px",
                    boxShadow: `0 5px 0 ${config.shadow}, 0 5px 0 1px #2D2016`,
                    padding: "12px 4px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    transform: `rotate(${config.rotate})`,
                    transition: "transform 0.15s, box-shadow 0.15s",
                    ...(activeSubject === subject.id
                      ? {
                          transform: `rotate(${config.rotate}) scale(1.08)`,
                          boxShadow: `0 8px 0 ${config.shadow}, 0 8px 0 1px #2D2016`
                        }
                      : {})
                  }}
                >
                  <span style={{ fontSize: "28px", lineHeight: 1 }}>
                    {config.emoji}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "11px",
                      color: "#fff",
                      letterSpacing: "0.3px",
                      textShadow: "0 1px 0 rgba(0,0,0,0.2)",
                      textAlign: "center",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {subject.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big featured banner */}
        <div
          style={{
            padding: "16px 20px",
            animation: "slideUp 0.5s 0.55s ease both",
            opacity: 0,
            animationFillMode: "forwards"
          }}
        >
          <div
            style={{
              background: "#2D2016",
              borderRadius: "24px",
              padding: "18px 20px",
              border: "3px solid #2D2016",
              boxShadow: "4px 4px 0 #FF6B6B",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer"
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                right: "-20px",
                top: "-20px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(255,215,61,0.12)"
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "20px",
                bottom: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255,107,107,0.1)"
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#FFD93D",
                    border: "2px solid #2D2016",
                    borderRadius: "8px",
                    padding: "2px 10px",
                    marginBottom: "8px"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "11px",
                      color: "#2D2016"
                    }}
                  >
                    🏆 DAILY CHALLENGE
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "20px",
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.2
                  }}
                >
                  Brain Buster
                  <br />
                  <span style={{ color: "#FFD93D" }}>Mixed Quiz</span>
                </p>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#9B8B6E",
                    margin: "6px 0 12px"
                  }}
                >
                  10 questions · ~5 min · 50 XP reward
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#FF6B6B",
                    border: "2.5px solid #fff",
                    borderRadius: "12px",
                    padding: "7px 16px",
                    boxShadow: "2px 2px 0 rgba(0,0,0,0.3)"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "14px",
                      color: "#fff",
                      letterSpacing: "0.3px"
                    }}
                  >
                    Start Now
                  </span>
                  <span style={{ fontSize: "14px" }}>→</span>
                </div>
              </div>
              <div style={{ fontSize: "64px", lineHeight: 1, flexShrink: 0 }}>
                🎯
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Showing subject descriptions as a teaser */}
        <div
          style={{
            padding: "4px 20px 20px",
            animation: "slideUp 0.5s 0.65s ease both",
            opacity: 0,
            animationFillMode: "forwards"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px"
            }}
          >
            <div
              style={{
                flex: 1,
                height: "2.5px",
                background: "#E8DCC8",
                borderRadius: "2px"
              }}
            />
            <span
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: "15px",
                color: "#9B8B6E"
              }}
            >
              EXPLORE MORE
            </span>
            <div
              style={{
                flex: 1,
                height: "2.5px",
                background: "#E8DCC8",
                borderRadius: "2px"
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {subjects.slice(0, 3).map((subject, i) => {
              const config = getSubjectConfig(subject.id);
              return (
                <div
                  key={subject.id}
                  className="recent-card"
                  style={{
                    background: "#fff",
                    border: "3px solid #2D2016",
                    borderRadius: "20px",
                    boxShadow: `4px 4px 0 ${config.shadow}, 4px 4px 0 1px #2D2016`,
                    overflow: "hidden",
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
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "0" }}
                  >
                    {/* Color strip */}
                    <div
                      style={{
                        width: "64px",
                        alignSelf: "stretch",
                        background: config.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        flexShrink: 0,
                        borderRight: "3px solid #2D2016"
                      }}
                    >
                      {config.emoji}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, padding: "12px 14px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "4px"
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: "'Nunito', sans-serif",
                              fontWeight: 800,
                              fontSize: "11px",
                              color: config.shadow,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px"
                            }}
                          >
                            {subject.label}
                          </span>
                          <p
                            style={{
                              fontFamily: "'Fredoka One', cursive",
                              fontSize: "16px",
                              color: "#2D2016",
                              margin: "2px 0 6px",
                              lineHeight: 1.2
                            }}
                          >
                            {subject.courses && subject.courses.length > 0
                              ? `${subject.courses.length} Course${
                                  subject.courses.length !== 1 ? "s" : ""
                                }`
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

                      <p
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 600,
                          fontSize: "12px",
                          color: "#666",
                          margin: 0,
                          lineHeight: 1.3
                        }}
                      >
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
        <div style={{ height: "32px" }} />
      </div>
    </div>
  );
};

export default HomePage;
