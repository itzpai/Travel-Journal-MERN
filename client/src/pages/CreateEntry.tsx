import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEntry } from "../utils/api";
import { entrySchema, EntryFormDataZod } from "../validations/schemas";

export default function CreateEntry() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormDataZod>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      name: "",
      location: "",
      country: "",
      about: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: EntryFormDataZod) => {
    setApiError(null);
    try {
      const newEntry = await createEntry(data);
      navigate(`/entry/${newEntry._id}`);
    } catch (err: any) {
      setApiError(err.message || "Failed to create entry. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back</span>
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Create New Travel Entry
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Bagan"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Google Maps URL *
          </label>
          <input
            type="url"
            id="location"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://maps.google.com/..."
            {...register("location")}
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">
              {errors.location.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Country *
          </label>
          <input
            type="text"
            id="country"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Myanmar"
            {...register("country")}
          />
          {errors.country && (
            <p className="mt-1 text-xs text-red-600">
              {errors.country.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            About *
          </label>
          <textarea
            id="about"
            rows={6}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.about ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tell us about this place..."
            {...register("about")}
          />
          {errors.about && (
            <p className="mt-1 text-xs text-red-600">
              {errors.about.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL *
          </label>
          <input
            type="url"
            id="imageUrl"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.imageUrl ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://example.com/image.jpg"
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-xs text-red-600">
              {errors.imageUrl.message as string}
            </p>
          )}
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {apiError}
          </div>
        )}

        <div className="flex space-x-4">
          <Link
            to="/"
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
