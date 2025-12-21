import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createEntry } from '../services/api'
import { TravelEntryFormData } from '../types'

export default function CreateEntry() {
  const [formData, setFormData] = useState<TravelEntryFormData>({
    name: '',
    location: '',
    country: '',
    about: '',
    imageUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const newEntry = await createEntry(formData)
      window.location.href = `/entry/${newEntry._id}`
    } catch (err) {
      setError('Failed to create entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back</span>
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Travel Entry</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="e.g., Bagan"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Google Maps URL *
          </label>
          <input
            type="url"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="e.g., Myanmar"
          />
        </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
            About *
          </label>
          <textarea
            id="about"
            name="about"
            required
            rows={6}
            value={formData.about}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Tell us about this place..."
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL *
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            required
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
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
            disabled={loading}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Entry'}
          </button>
        </div>
      </form>
    </div>
  )
}

