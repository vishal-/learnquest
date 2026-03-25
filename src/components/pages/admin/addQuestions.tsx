import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/adminLayout";
import Input from "../../ui/input";
import Textarea from "../../ui/textarea";
import Select from "../../ui/select";
import Button from "../../ui/button";
import { batchSaveQuestions } from "../../../lib/firestore.questions";
import { trackFeatureUsage } from "../../../lib/analytics";
import { QuizSubject, QuizDifficulty } from "../../../types/quiz.type";
import type { Question } from "../../../types/quiz.type";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiAlertCircle,
  FiCheck
} from "react-icons/fi";

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

const AddQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleViewQuestions = () => {
    setError(null);
    setSuccess(null);

    try {
      const parsed = JSON.parse(jsonInput);

      // Validate that it's an array
      if (!Array.isArray(parsed)) {
        setError("JSON must be an array of questions");
        return;
      }

      // Validate each question
      const validatedQuestions = parsed.map((q: any, index: number) => {
        if (
          !q.subject ||
          !q.difficulty ||
          !q.question ||
          !Array.isArray(q.options) ||
          !q.answer ||
          !q.explanation
        ) {
          throw new Error(
            `Question ${index + 1} is missing required fields. Required: subject, difficulty, question, options (array), answer, explanation`
          );
        }

        if (q.options.length !== 4) {
          throw new Error(`Question ${index + 1}: Must have exactly 4 options`);
        }

        return {
          id: `temp-${Date.now()}-${index}`,
          subject: q.subject,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          createdAt: new Date()
        } as Question;
      });

      setQuestions(validatedQuestions);
      trackFeatureUsage("admin_view_questions", {
        count: validatedQuestions.length
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid JSON format";
      setError(errorMessage);
      setQuestions([]);
    }
  };

  const handleEditQuestion = (
    questionId: string,
    field: keyof Question,
    value: any
  ) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleSaveQuestions = async () => {
    if (questions.length === 0) {
      setError("No questions to save");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Remove temp IDs and createdAt before saving
      const questionsToSave = questions.map(
        ({ id, createdAt, ...rest }) => rest
      );

      const result = await batchSaveQuestions(questionsToSave);

      trackFeatureUsage("admin_save_questions", {
        success: result.success,
        failed: result.failed
      });

      if (result.failed === 0) {
        setSuccess(
          `Successfully saved ${result.success} question${result.success !== 1 ? "s" : ""}!`
        );
        setJsonInput("");
        setQuestions([]);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setError(
          `${result.success} saved, ${result.failed} failed. Errors: ${result.errors.join("; ")}`
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save questions";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Add Quiz Questions"
      subtitle="Import questions from JSON"
    >
      <div className="space-y-8">
        {/* JSON Input Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Import Questions (JSON)
          </h2>

          <Textarea
            label="Paste JSON here"
            helperText="Expected format: Array of questions with subject, difficulty, question, options (4 items), answer, and explanation"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            textareaSize="lg"
            error={!!error && questions.length === 0}
            placeholder={`[
  {
    "subject": "Math",
    "difficulty": "Curious",
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "answer": "4",
    "explanation": "Two plus two equals four"
  }
]`}
          />

          <div className="mt-4">
            <Button
              onClick={handleViewQuestions}
              disabled={!jsonInput.trim()}
              size="md"
            >
              <FiPlus className="h-4 w-4 mr-2" />
              View Questions
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex gap-3">
            <FiAlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded flex gap-3">
            <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">Success</p>
              <p className="text-sm text-green-700 mt-1">{success}</p>
            </div>
          </div>
        )}

        {/* Questions Display */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Questions ({questions.length})
              </h2>
            </div>

            <div className="grid gap-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Question {index + 1}
                    </h3>
                    <Button
                      onClick={() => handleDeleteQuestion(question.id)}
                      variant="danger"
                      size="sm"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Subject & Difficulty */}
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Subject"
                        options={getSubjectOptions()}
                        value={question.subject}
                        onChange={(value) =>
                          handleEditQuestion(question.id, "subject", value)
                        }
                      />
                      <Select
                        label="Difficulty"
                        options={getDifficultyOptions()}
                        value={question.difficulty}
                        onChange={(value) =>
                          handleEditQuestion(question.id, "difficulty", value)
                        }
                      />
                    </div>

                    {/* Question Text */}
                    <Textarea
                      label="Question"
                      value={question.question}
                      onChange={(e) =>
                        handleEditQuestion(
                          question.id,
                          "question",
                          e.target.value
                        )
                      }
                      textareaSize="md"
                    />

                    {/* Options with Answer Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options & Correct Answer
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                              question.answer === option
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`answer-${question.id}`}
                              value={option}
                              checked={question.answer === option}
                              onChange={() =>
                                handleEditQuestion(
                                  question.id,
                                  "answer",
                                  option
                                )
                              }
                              className="w-4 h-4 text-blue-600 cursor-pointer flex-shrink-0"
                            />
                            <Input
                              value={option}
                              onChange={(e) => {
                                const updatedOptions = [...question.options];
                                updatedOptions[optIndex] = e.target.value;
                                handleEditQuestion(
                                  question.id,
                                  "options",
                                  updatedOptions
                                );
                              }}
                              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              className="flex-grow"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explanation */}
                    <Textarea
                      label="Explanation"
                      value={question.explanation}
                      onChange={(e) =>
                        handleEditQuestion(
                          question.id,
                          "explanation",
                          e.target.value
                        )
                      }
                      textareaSize="sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button (Sticky) */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4">
              <Button
                onClick={() => setQuestions([])}
                variant="outline"
                size="md"
              >
                Clear All
              </Button>
              <Button
                onClick={handleSaveQuestions}
                disabled={loading}
                variant="success"
                size="md"
              >
                <FiSave className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save All Questions"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AddQuestionsPage;
