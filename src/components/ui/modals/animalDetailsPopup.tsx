import { Icon } from "@iconify/react";
import Popup from "./popup";

interface AnimalDetails {
  icon: string;
  category: string;
  home: string;
  baby: string;
  habitat: string;
  about: string;
}

interface AnimalDetailsPopupProps {
  animalName: string;
  details: AnimalDetails;
  isOpen: boolean;
  onClose: () => void;
}

const AnimalDetailsPopup = ({
  animalName,
  details,
  isOpen,
  onClose
}: AnimalDetailsPopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={animalName.replace(/_/g, " ")}
      icon={
        <div className="text-7xl">
          <Icon icon={details.icon} width="96" height="96" />
        </div>
      }
    >
      {/* About Section */}
      <div className="mb-6 bg-[#FFF8E7] rounded-lg p-4 border-2 border-[#2D2016]">
        <p className="text-sm font-nunito text-[#2D2016] leading-relaxed">
          {details.about}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Category */}
        <div className="bg-[#FFE5E5] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#8B4545] mb-1">
            Type
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016] capitalize">
            {details.category}
          </p>
        </div>

        {/* Home */}
        <div className="bg-[#E5F5FF] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#4B8FA3] mb-1">
            🏠 Home
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016] capitalize">
            {details.home}
          </p>
        </div>

        {/* Baby Name */}
        <div className="bg-[#FFE5F5] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#8B4B6F] mb-1">
            👶 Baby
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016] capitalize">
            {details.baby}
          </p>
        </div>

        {/* Habitat */}
        <div className="bg-[#E5FFE5] rounded-lg p-3 border-2 border-[#2D2016]">
          <p className="text-xs font-poppins font-bold text-[#4B8B4B] mb-1">
            🌍 Habitat
          </p>
          <p className="text-sm font-nunito font-bold text-[#2D2016] capitalize">
            {details.habitat}
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default AnimalDetailsPopup;
