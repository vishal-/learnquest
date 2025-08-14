import React from "react";
import { useNavigate } from "react-router-dom";

interface TileProps {
  imageSrc: string;
  label: string;
  route: string;
}

const Tile: React.FC<TileProps> = ({ imageSrc, label, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-48 h-48 rounded-2xl shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-2xl cursor-pointer select-none overflow-hidden group"
      style={{ background: "var(--color-background)" }}
    >
      <img src={imageSrc} alt={label} className="w-full h-full object-cover" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/80 via-transparent to-transparent pointer-events-none" />
      {/* CTA Label */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gray-700 text-[var(--color-text)] font-bold text-lg shadow-lg transition group-hover:bg-[var(--color-accent)] group-hover:scale-105 group-active:scale-95">
        {label}
      </span>
    </div>
  );
};

export default Tile;
