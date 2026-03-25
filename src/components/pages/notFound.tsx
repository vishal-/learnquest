import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FloatingStar {
  id: number;
  left: number;
  duration: number;
  opacity: number;
}

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState<FloatingStar[]>([]);

  useEffect(() => {
    // Create floating stars - fewer on mobile for performance
    const starCount = window.innerWidth < 640 ? 15 : 25;
    const floatingStars: FloatingStar[] = Array.from(
      { length: starCount },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        opacity: Math.random() * 0.8 + 0.2
      })
    );
    setStars(floatingStars);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-300 animate-gradient p-4 md:p-0">
      {/* Floating stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full animate-float"
          style={{
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity
          }}
        />
      ))}

      {/* 404 Container */}
      <div className="relative bg-white/90 px-5 py-6 sm:px-8 sm:py-10 rounded-2xl sm:rounded-3xl shadow-lg max-w-md w-full animate-float-container">
        {/* Emoji */}
        <div className="text-3xl sm:text-5xl md:text-5xl mb-3 sm:mb-4 animate-bounce text-center">
          🦄✨
        </div>

        {/* 404 Text */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-red-500 mb-2 sm:mb-3 animate-wiggle text-center">
          404
        </h1>

        {/* Messages */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 sm:mb-4 text-center font-semibold leading-snug">
          Oh no! The page ran away to join the circus 🎪
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 text-center leading-snug">
          Let's bring you back before the monkeys find you! 🐒
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2.5 sm:py-3 bg-red-500 text-white text-sm sm:text-base rounded-full font-semibold hover:bg-orange-400 active:scale-95 transition-all duration-300 hover:scale-105 shadow-md"
          >
            🏠 Take Me Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes floatContainer {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(2deg);
          }
          75% {
            transform: rotate(-2deg);
          }
        }

        @keyframes floatStar {
          from {
            transform: translateY(100vh);
          }
          to {
            transform: translateY(-10vh);
          }
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 10s ease infinite;
        }

        .animate-float-container {
          animation: floatContainer 3s ease-in-out infinite;
        }

        .animate-float {
          animation: floatStar linear infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 4s;
          }
          
          .animate-float-container {
            animation-duration: 2.5s;
          }
        }

        /* Disable scale on touch devices for better performance */
        @media (hover: none) and (pointer: coarse) {
          button:hover {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
