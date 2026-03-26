import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center p-5 min-h-[200px]"
      aria-label="Loading content"
    >
      <div className="relative w-[60px] h-[60px]">
        <div className="w-full h-full border-4 border-t-red-500 border-r-teal-400 border-b-blue-500 border-l-green-400 rounded-full animate-[spin_1.2s_linear_infinite,pulse_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

export default Loader;
