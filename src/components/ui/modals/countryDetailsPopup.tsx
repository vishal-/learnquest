import { Icon } from "@iconify/react";
import Popup from "./popup";

interface CountryDetails {
  flag: string;
  capital: string;
  currency: string;
  continent: string;
  languages: string[];
  about: string;
}

interface CountryDetailsPopupProps {
  countryName: string;
  details: CountryDetails;
  isOpen: boolean;
  onClose: () => void;
}

const CountryDetailsPopup = ({
  countryName,
  details,
  isOpen,
  onClose
}: CountryDetailsPopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={countryName}
      icon={
        <div className="text-7xl">
          <Icon icon={details.flag} width="96" height="96" />
        </div>
      }
      maxWidth="max-w-md"
    >
      {/* About Section */}
      <div className="mb-6 bg-[#FFF8E7] rounded-lg p-4 border-2 border-[#2D2016]">
        <p className="text-sm font-nunito text-[#2D2016] leading-relaxed">
          {details.about}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Capital */}
        <div className="bg-[#FFE5E5] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#8B4545] mb-1">
            🏛️ Capital
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016]">
            {details.capital}
          </p>
        </div>

        {/* Currency */}
        <div className="bg-[#E5F5FF] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#4B8FA3] mb-1">
            💰 Currency
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016]">
            {details.currency}
          </p>
        </div>

        {/* Continent */}
        <div className="bg-[#E5FFE5] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#4B8B4B] mb-1">
            🌍 Continent
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016]">
            {details.continent}
          </p>
        </div>

        {/* Languages */}
        <div className="bg-[#FFE5F5] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#8B4B7C] mb-1">
            🗣️ Languages
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016]">
            {details.languages.length === 1
              ? details.languages[0]
              : `${details.languages.length} languages`}
          </p>
        </div>
      </div>

      {/* Languages List */}
      {details.languages.length > 0 && (
        <div className="mt-4 p-3 bg-[#F5F5F5] rounded-lg border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#2D2016] mb-2">
            Spoken Languages:
          </p>
          <div className="flex flex-wrap gap-2">
            {details.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-white border-2 border-[#2D2016] rounded-full text-xs font-nunito font-bold text-[#2D2016]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CountryDetailsPopup;
