import { useState } from "react";
import { Icon } from "@iconify/react";
import animalsData from "../../../dataset/animals.json";
import AnimalDetailsPopup from "../../ui/animalDetailsPopup";

interface AnimalDetails {
  icon: string;
  category: string;
  home: string;
  baby: string;
  habitat: string;
  about: string;
}

const LearnAnimals = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const animals = Object.entries(animalsData) as [string, AnimalDetails][];

  const handleAnimalClick = (animalName: string) => {
    setSelectedAnimal(animalName);
  };

  const handleClosePopup = () => {
    setSelectedAnimal(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-nunito pb-10">
      <div className="px-4 py-8 max-w-[430px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-[#2D2016] mb-2">
            Learn About Animals 🐾
          </h1>
          <p className="text-gray-600">
            Click on any animal to learn more about it!
          </p>
        </div>

        {/* Animals Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {animals.map(([name, details], index) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-3 border-[#2D2016] hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-110 hover:bg-[#FFF8E7]"
              style={
                {
                  animation: `popIn 0.5s ${index * 0.05}s ease both`,
                  opacity: 0
                } as React.CSSProperties
              }
              onClick={() => handleAnimalClick(name)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAnimalClick(name);
                }
              }}
            >
              <div className="text-5xl">
                <Icon icon={details.icon} width="60" height="60" />
              </div>
              <span className="text-sm font-poppins font-bold text-[#2D2016] text-center capitalize line-clamp-2">
                {name.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>

        {/* Fun Fact */}
        <div className="mt-12 p-4 bg-[#FFE5E5] border-3 border-[#2D2016] rounded-xl">
          <p className="text-sm font-nunito text-[#2D2016] leading-relaxed">
            💡 <strong>Did you know?</strong> There are over 8.7 million
            different animal species on Earth! Each one is special and unique in
            its own way.
          </p>
        </div>
      </div>

      {/* Popup */}
      <AnimalDetailsPopup
        isOpen={!!selectedAnimal}
        animalName={selectedAnimal || ""}
        details={animalsData[selectedAnimal as keyof typeof animalsData] || {}}
        onClose={handleClosePopup}
      />

      <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LearnAnimals;
