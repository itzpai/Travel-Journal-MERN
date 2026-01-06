import { useNavigate } from "react-router-dom";
import { EntryProps } from "../types";

export default function ContentCard({ item, onDelete, canEdit }: EntryProps) {
  const navigate = useNavigate();
  const googleMapsUrl = item.googleMapsUrl || item.location;

  const handlrCardClick = () => {
    navigate(`/entry/${item._id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      onDelete(item._id);
    }
  };

  return (
    <article
      onClick={handlrCardClick}
      className="flex items-stretch gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="w-31 h-40 rounded-lg overflow-hidden shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <span className="text-lg">📍</span>
            <h2 className="text-base leading-tight font-semibold">
              {item.name}
            </h2>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-1 text-xs text-gray-500 underline hover:text-blue-600 transition-colors"
            >
              View on Google Maps
            </a>
          </div>

          {canEdit && (
            <button
              onClick={handleDeleteClick}
              className="border border-gray-800 rounded p-1 bg-white hover:bg-gray-100 transition-colors flex items-center justify-center ml-auto z-10"
            >
              <span className="text-sm">🗑️</span>
            </button>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-base font-bold text-gray-700 uppercase mb-2">
            {item.country}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {item.about}
          </p>
        </div>
      </div>
    </article>
  );
}
