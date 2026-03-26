import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layouts/adminLayout";
import Textarea from "@/components/ui/forms/textarea";
import Button from "@/components/ui/forms/button";
import QuestionCard from "@/components/ui/questions/questionCard";
import { batchSaveQuestions } from "@/lib/firestore.questions";
import { trackFeatureUsage } from "@/lib/analytics";
import type { Question } from "@/types/quiz.type";
import { FiPlus, FiSave, FiAlertCircle, FiCheck } from "react-icons/fi";

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
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index + 1}
                  mode="edit"
                  onEdit={handleEditQuestion}
                  onDelete={handleDeleteQuestion}
                  showDeleteButton={true}
                />
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
