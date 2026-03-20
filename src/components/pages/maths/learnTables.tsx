import { useState, useCallback } from "react";
import CourseContent from "../../ui/courseContent";
import Select from "../../ui/select";
import type { Course } from "../../../types/subject.types";

// ─── Helpers ───────────────────────────────────────────────────────────────

const generateTable = (
  number: number
): Array<{ multiplier: number; result: number }> => {
  const table = [];
  for (let i = 1; i <= 12; i++) {
    table.push({ multiplier: i, result: number * i });
  }
  return table;
};

// ─── Main Component ────────────────────────────────────────────────────────

export default function LearnTables({ course }: { course: Course }) {
  const [selectedNumber, setSelectedNumber] = useState<number>(2);
  const [table, setTable] = useState(generateTable(2));

  const handleTableChange = useCallback((num: number) => {
    setSelectedNumber(num);
    setTable(generateTable(num));
  }, []);

  return (
    <CourseContent>
      <CourseContent.Title description={course.description} />

      {/* Table Selector */}
      <div className="text-center mb-8">
        <p className="font-poppins font-bold text-sm text-[#2D2016] mb-4">
          Select a table to learn:
        </p>
        <div className="mb-6 max-w-xs mx-auto">
          <Select
            label=""
            options={Array.from({ length: 19 }, (_, i) => ({
              label: (i + 2).toString(),
              value: i + 2
            }))}
            value={selectedNumber}
            onChange={(value) => handleTableChange(Number(value))}
          />
        </div>
      </div>

      {/* Table Display */}
      <CourseContent.Card className="border-4 mb-8">
        <div className="text-center mb-6">
          <p className="font-poppins font-bold text-2xl text-[#2D2016] mb-6">
            Table of {selectedNumber}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {table.map(({ multiplier, result }) => (
            <div
              key={multiplier}
              className="p-4 rounded-2xl border-4 border-[#2D2016] bg-gradient-to-r from-[#cdb4db] to-[#ffc8dd] 
                         font-poppins font-bold text-[#2D2016] text-lg flex justify-between items-center"
            >
              <span>
                {selectedNumber} × {multiplier}
              </span>
              <span className="text-[#5B9BFF]">=</span>
              <span>{result}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="font-nunito font-bold text-xs text-[#9B8B6E]">
            Study the multiplication facts ✏️
          </p>
        </div>
      </CourseContent.Card>
    </CourseContent>
  );
}
