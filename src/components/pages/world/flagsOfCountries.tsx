import { useState, useEffect } from "react";
import { getFlags } from "../../../lib/firestore";
import { appConfig } from "../../../config/app.config";
import CourseContent from "../../ui/courseContent";

interface FlagData {
  image: string;
  thumbnail: string;
}

interface FlagsOfCountriesProps {
  course: {
    description: string;
  };
}

export default function FlagsOfCountries({ course }: FlagsOfCountriesProps) {
  const { description } = course;
  const [flags, setFlags] = useState<Record<string, FlagData>>({});
  const [loading, setLoading] = useState(true);

  const imgUrl = appConfig.baseImagePath + "/flags/thumbs/";

  useEffect(() => {
    const loadFlags = async () => {
      const flagsData = await getFlags();
      setFlags(flagsData);
      setLoading(false);
    };
    loadFlags();
  }, []);

  if (loading) {
    return <div className="p-4">Loading flags...</div>;
  }

  return (
    <CourseContent>
      <CourseContent.Title description={description} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Object.entries(flags).map(([country, data]) => (
          <div key={country} className="text-center p-2 border rounded">
            <img
              src={`${imgUrl}${data.thumbnail}`}
              alt={`${country} flag`}
              className="w-full h-16 object-contain mb-2"
            />
            <p className="text-sm font-medium">{country}</p>
          </div>
        ))}
      </div>
    </CourseContent>
  );
}
