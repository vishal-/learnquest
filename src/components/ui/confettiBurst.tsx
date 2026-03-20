// ─── Confetti Component ──────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#FF6B9D",
  "#FFD93D",
  "#90EE90",
  "#5B9BFF",
  "#FF9F43",
  "#A855F7"
];

interface ConfettiBurstProps {
  active: boolean;
}

const ConfettiBurst = ({ active }: ConfettiBurstProps) => {
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
};

export default ConfettiBurst;
