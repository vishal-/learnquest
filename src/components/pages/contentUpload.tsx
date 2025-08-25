import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../config/firebase.config";

const ContentUpload: React.FC = () => {
  const [collection, setCollection] = useState<string>("datasets");
  const [documentId, setDocumentId] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("{}");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const db = getFirestore(app);

  const handleUpload = async () => {
    setError(null);
    setSuccess(false);
    let parsedData: any;

    if (!collection || !documentId) {
      setError("Collection and Document ID are required");
      return;
    }

    try {
      parsedData = JSON.parse(jsonInput);
    } catch (e) {
      setError("Invalid JSON input");
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, collection, documentId), parsedData);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Failed to upload data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload JSON</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Collection:
        </label>
        <input
          type="text"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Collection name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Document ID:
        </label>
        <input
          type="text"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Document ID"
        />
      </div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        JSON Input:
      </label>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={15}
        className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        aria-label="JSON input"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition-colors duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="mt-4 text-red-600 font-medium">Error: {error}</p>}
      {success && (
        <p className="mt-4 text-green-600 font-medium">Upload successful!</p>
      )}
    </div>
  );
};

export default ContentUpload;
