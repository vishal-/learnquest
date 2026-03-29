import { useState } from "react";
import { Icon } from "@iconify/react";
import countriesData from "@/dataset/countries.json";
import CountryDetailsPopup from "@/components/ui/modals/countryDetailsPopup";
import CourseContent from "@/components/ui/display/courseContent";
import type { Course } from "@/types/subject.types";

interface CountryDetails {
  flag: string;
  capital: string;
  currency: string;
  continent: string;
  languages: string[];
  about: string;
}

const LearnCountries = ({ course }: { course: Course }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const countries = Object.entries(countriesData) as [string, CountryDetails][];

  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(countryName);
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };

  return (
    <CourseContent course={course}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-[#2D2016] mb-2">
          Learn About Countries 🌍
        </h1>
        <p className="text-gray-600">
          Click on any country to learn more about it!
        </p>
      </div>

      {/* Countries Grid */}
      <div
        className="grid gap-4 mb-8"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {countries.map(([name, details], index) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-3 border-[#2D2016] hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-110 hover:bg-[#FFF8E7]"
            style={
              {
                animation: `popIn 0.5s ${index * 0.05}s ease both`,
                opacity: 0
              } as React.CSSProperties
            }
            onClick={() => handleCountryClick(name)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCountryClick(name);
              }
            }}
          >
            <div className="text-5xl">
              <Icon icon={details.flag} width="60" height="60" />
            </div>
            <span className="text-sm font-poppins font-bold text-[#2D2016] text-center capitalize line-clamp-2">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Fun Fact */}
      <div className="p-4 bg-[#FFE5E5] border-3 border-[#2D2016] rounded-xl">
        <p className="text-sm font-nunito text-[#2D2016] leading-relaxed">
          🌐 <strong>Did you know?</strong> There are more than{" "}
          {countries.length} countries in the world! Each one has its own unique
          culture, language, and history.
        </p>
      </div>

      {/* Country Details Popup */}
      {selectedCountry && (
        <CountryDetailsPopup
          countryName={selectedCountry}
          details={countriesData[selectedCountry as keyof typeof countriesData]}
          isOpen={!!selectedCountry}
          onClose={handleClosePopup}
        />
      )}

      <style>{`
        @keyframes popIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </CourseContent>
  );
};

export default LearnCountries;
