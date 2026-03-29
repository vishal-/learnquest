import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { getIdTokenResult } from "firebase/auth";
import AdminLayout from "@/components/layouts/adminLayout";
import Popup from "@/components/ui/modals/popup";
import QuestionCard from "@/components/ui/questions/questionCard";
import Select from "@/components/ui/forms/select";
import Button from "@/components/ui/forms/button";
import { FiEdit2, FiTrash2, FiAlertCircle } from "react-icons/fi";
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion
} from "@/lib/firestore.questions";
import { QuizSubject, QuizDifficulty } from "@/types/quiz.type";
import type { Question } from "@/types/quiz.type";

const QuestionsManagementPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 20;

  // Check admin role
  useEffect(() => {
    const checkAdminRole = async () => {
      setLoading(true);
      try {
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const idTokenResult = await getIdTokenResult(user);
        const isUserAdmin = idTokenResult.claims?.role === "admin";
        setIsAdmin(isUserAdmin);

        if (!isUserAdmin) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  // Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!isAdmin) return;

      try {
        const allQuestions = await getAllQuestions();
        // Sort by createdAt descending (last added first)
        const sorted = allQuestions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setQuestions(sorted);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (isAdmin) {
      fetchQuestions();
    }
  }, [isAdmin]);

  // Apply filters
  useEffect(() => {
    let filtered = questions;

    if (selectedSubject) {
      filtered = filtered.filter((q) => q.subject === selectedSubject);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    setFilteredQuestions(filtered);
    setCurrentPage(1); // Reset to first page
  }, [questions, selectedSubject, selectedDifficulty]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Handlers
  const handleEdit = (question: Question) => {
    setEditingQuestion({ ...question });
    setIsEditPopupOpen(true);
  };

  const handleEditField = (field: keyof Question, value: any) => {
    if (editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        [field]: value
      });
    }
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;

    setIsSaving(true);
    try {
      await updateQuestion(editingQuestion.id, editingQuestion);
      // Update local state
      setQuestions((prev) =>
        prev.map((q) => (q.id === editingQuestion.id ? editingQuestion : q))
      );
      setIsEditPopupOpen(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    setDeleteError(null);
    try {
      await deleteQuestion(questionId);
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      setIsEditPopupOpen(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error deleting question:", error);
      setDeleteError("Failed to delete question. Please try again.");
    }
  };

  // Subject and Difficulty options
  const subjectOptions = [
    { label: "All Subjects", value: "" },
    ...Object.values(QuizSubject).map((subject) => ({
      label: subject,
      value: subject
    }))
  ];

  const difficultyOptions = [
    { label: "All Difficulties", value: "" },
    ...Object.values(QuizDifficulty).map((difficulty) => ({
      label: difficulty,
      value: difficulty
    }))
  ];

  if (loading) {
    return (
      <AdminLayout title="Questions Management">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout title="Access Denied">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <FiAlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              Access Denied
            </h2>
            <p className="text-gray-500">You do not have admin access.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Questions Management">
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Filter by Subject"
              options={subjectOptions}
              value={selectedSubject}
              onChange={(value) => setSelectedSubject(String(value))}
            />
            <Select
              label="Filter by Difficulty"
              options={difficultyOptions}
              value={selectedDifficulty}
              onChange={(value) => setSelectedDifficulty(String(value))}
            />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {paginatedQuestions.length} of {filteredQuestions.length}{" "}
            questions
          </div>
        </div>

        {/* Questions List */}
        {paginatedQuestions.length > 0 ? (
          <div className="space-y-2">
            {paginatedQuestions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">
                          <span className="font-medium">
                            {question.subject}
                          </span>
                          {" • "}
                          <span>{question.difficulty}</span>
                        </p>
                        <p className="text-gray-900 font-medium line-clamp-2">
                          {/* Question number in pagination */}
                          {startIndex + index + 1}. {question.question}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Added:{" "}
                          {new Date(question.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(question)}
                      variant="primary"
                      size="sm"
                      title="Edit question"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteQuestion(question.id)}
                      variant="danger"
                      size="sm"
                      title="Delete question"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No questions found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 bg-white rounded-lg shadow p-4">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="secondary"
              size="sm"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="secondary"
              size="sm"
            >
              Next
            </Button>
          </div>
        )}

        {/* Edit Popup */}
        <Popup
          isOpen={isEditPopupOpen}
          onClose={() => {
            setIsEditPopupOpen(false);
            setEditingQuestion(null);
            setDeleteError(null);
          }}
          title="Edit Question"
          maxWidth="max-w-2xl"
        >
          {editingQuestion && (
            <div className="space-y-4">
              <QuestionCard
                question={editingQuestion}
                index={1}
                mode="edit"
                onEdit={(questionId, field, value) => {
                  // Match the QuestionCard's onEdit signature
                  if (editingQuestion && editingQuestion.id === questionId) {
                    handleEditField(field, value);
                  }
                }}
                onDelete={() => handleDeleteQuestion(editingQuestion.id)}
                showDeleteButton={true}
              />

              {deleteError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                  {deleteError}
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setIsEditPopupOpen(false);
                    setEditingQuestion(null);
                  }}
                  variant="secondary"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveQuestion}
                  variant="primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </AdminLayout>
  );
};

export default QuestionsManagementPage;
