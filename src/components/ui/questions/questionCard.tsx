import React from "react";
import type { Question } from "@/types/quiz.type";
import { QuizSubject, QuizDifficulty } from "@/types/quiz.type";
import Input from "@/components/ui/forms/input";
import Textarea from "@/components/ui/forms/textarea";
import Select from "@/components/ui/forms/select";
import Button from "@/components/ui/forms/button";
import { FiTrash2 } from "react-icons/fi";

interface QuestionCardProps {
  question: Question;
  index: number;
  mode?: "view" | "edit";
  onEdit?: (questionId: string, field: keyof Question, value: any) => void;
  onDelete?: (questionId: string) => void;
  showDeleteButton?: boolean;
}

// Helper function to create SelectOptions from enums
const getSubjectOptions = () =>
  Object.values(QuizSubject).map((subject) => ({
    label: subject,
    value: subject
  }));

const getDifficultyOptions = () =>
  Object.values(QuizDifficulty).map((difficulty) => ({
    label: difficulty,
    value: difficulty
  }));

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  mode = "view",
  onEdit,
  onDelete,
  showDeleteButton = true
}) => {
  const isEditMode = mode === "edit" && onEdit;

  const handleEdit = (field: keyof Question, value: any) => {
    if (isEditMode) {
      onEdit(question.id, field, value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header with Index and Delete Button */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-900">Question {index}</h3>
        {showDeleteButton && onDelete && isEditMode && (
          <Button
            onClick={() => onDelete(question.id)}
            variant="danger"
            size="sm"
          >
            <FiTrash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Subject & Difficulty */}
        <div className="grid grid-cols-2 gap-4">
          {isEditMode ? (
            <>
              <Select
                label="Subject"
                options={getSubjectOptions()}
                value={question.subject}
                onChange={(value) => handleEdit("subject", value)}
              />
              <Select
                label="Difficulty"
                options={getDifficultyOptions()}
                value={question.difficulty}
                onChange={(value) => handleEdit("difficulty", value)}
              />
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <p className="text-gray-900 font-medium">{question.subject}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <p className="text-gray-900 font-medium">
                  {question.difficulty}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Question Text */}
        {isEditMode ? (
          <Textarea
            label="Question"
            value={question.question}
            onChange={(e) => handleEdit("question", e.target.value)}
            textareaSize="md"
          />
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <p className="text-gray-900 leading-relaxed">{question.question}</p>
          </div>
        )}

        {/* Options with Answer Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isEditMode ? "Options & Correct Answer" : "Options"}
          </label>
          <div className="space-y-2">
            {question.options.map((option, optIndex) => (
              <div
                key={optIndex}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  question.answer === option
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 " +
                      (isEditMode
                        ? "hover:border-blue-300 hover:bg-blue-50"
                        : "")
                }`}
              >
                {isEditMode ? (
                  <>
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      value={option}
                      checked={question.answer === option}
                      onChange={() => handleEdit("answer", option)}
                      className="w-4 h-4 text-blue-600 cursor-pointer flex-shrink-0"
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optIndex] = e.target.value;
                        handleEdit("options", updatedOptions);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                      className="flex-grow"
                    />
                  </>
                ) : (
                  <>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        question.answer === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {question.answer === option && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span
                      className={
                        question.answer === option
                          ? "font-semibold text-gray-900"
                          : "text-gray-700"
                      }
                    >
                      {option}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {isEditMode ? (
          <Textarea
            label="Explanation"
            value={question.explanation}
            onChange={(e) => handleEdit("explanation", e.target.value)}
            textareaSize="sm"
          />
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <p className="text-gray-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
