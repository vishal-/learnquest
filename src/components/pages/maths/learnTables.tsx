import { useState, useCallback } from "react";
import { speak } from "../../../lib/speak";
import { numberToWords } from "../../../lib/math.constants";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";
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

  const speakTable = () => {
    const tableText = table
      .map(
        ({ multiplier, result }) =>
          `${selectedNumber} times ${multiplier} is ${result}`
      )
      .join(", ");
    speak(tableText);
  };

  const speakFact = (multiplier: number, result: number) => {
    const text = `${numberToWords(selectedNumber)} times ${numberToWords(multiplier)} is ${numberToWords(result)}`;
    speak(text);
  };

  return (
    <CourseContent>
      <CourseContent.Title description={course.description} />

      {/* Table Selector */}
      <CourseContent.Card className="border-4 mb-8">
        <div className="text-center">
          <p className="font-poppins font-bold text-sm text-[#2D2016] mb-4">
            Select a table to learn:
          </p>
          <div className="mb-6">
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
          <Button
            onClick={speakTable}
            label="🔊 Hear Table"
            variant="primary"
          />
        </div>
      </CourseContent.Card>

      {/* Table Display */}
      <CourseContent.Card className="border-4 mb-8">
        <div className="text-center mb-6">
          <p className="font-poppins font-bold text-2xl text-[#2D2016] mb-6">
            Table of {selectedNumber}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {table.map(({ multiplier, result }) => (
            <button
              key={multiplier}
              onClick={() => speakFact(multiplier, result)}
              className="p-4 rounded-2xl border-4 border-[#2D2016] bg-gradient-to-r from-[#cdb4db] to-[#ffc8dd] 
                         font-poppins font-bold text-[#2D2016] transition-all hover:shadow-[0_4px_0_#2D2016]
                         active:translate-y-[2px] active:shadow-[0_2px_0_#2D2016]"
            >
              <div className="text-sm mb-2">{selectedNumber}</div>
              <div className="text-xl">×</div>
              <div className="text-sm mb-2">{multiplier}</div>
              <div className="text-lg font-bold text-[#5B9BFF]">=</div>
              <div className="text-xl">{result}</div>
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="font-nunito font-bold text-xs text-[#9B8B6E]">
            Click on any multiplication fact to hear it 🔊
          </p>
        </div>
      </CourseContent.Card>
    </CourseContent>
  );
}
