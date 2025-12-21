import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEntryById } from "../services/api";
import { TravelEntry } from "../types";

export default function EntryDetail() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<TravelEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadEntry();
    }
  }, [id]);

  const loadEntry = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEntryById(id!);
      setEntry(data);
    } catch (err) {
      setError("Entry not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <p className="text-gray-600 text-lg">{error || "Entry not found"}</p>
        <Link
          to="/"
          className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back</span>
      </Link>

      <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl shadow-lg overflow-hidden gap-4 w-full">
        <img
          src={entry.imageUrl}
          alt={entry.name}
          className="w-full object-cover md:w-1/2 rounded-l-lg shrink-0"
        />
        <div className="p-8 flex-1">
          <div className="flex items-center space-x-2 text-sm text-gray-500 uppercase tracking-widest font-semibold mb-4">
            <span>📍</span>
            <span>{entry.name.toUpperCase()}</span>
            <a
              href={entry.googleMapsUrl || entry.location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline lowercase hover:text-red-500 transition-colors ml-3"
            >
              View on Google Maps
            </a>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {entry.name}
          </h1>

          <div className="text-lg font-semibold text-gray-700 mb-6 uppercase">
            {entry.country}
          </div>

          <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
            {entry.about}
          </p>
        </div>
      </div>
    </div>
  );
}
