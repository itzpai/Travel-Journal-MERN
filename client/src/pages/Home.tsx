import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEntries, deleteEntry } from "../services/api";
import ContentCard from "../components/ContentCard";
import { TravelEntry } from "../types";

export default function Home() {
  const [entries, setEntries] = useState<TravelEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEntries();
      setEntries(data);
    } catch (err) {
      setError("Failed to load travel entries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      alert("Failed to delete entry");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <p className="text-gray-600 text-lg">{error}</p>
        <p className="text-gray-500 text-sm mt-2">
          Please check your connection and try again
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2 className="font-normal text-xl mb-4">No travel entries yet.</h2>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <span>+</span>
          <span>Create Your First Entry</span>
        </Link>
      </div>
    );
  }

  return (
    <main>
      {entries.map((entry) => (
        <ContentCard key={entry._id} item={entry} onDelete={handleDelete} />
      ))}
    </main>
  );
}
