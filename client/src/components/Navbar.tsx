import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="flex items-center justify-between py-4 px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-xl">🌍</span>
          <Link to="/" className="ml-1 text-black font-semibold text-lg no-underline">
            Travel Journal.
          </Link>
        </div>
        <Link
          to="/create"
          className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <span>+</span>
          <span>Create Entry</span>
        </Link>
      </nav>
    </header>
  )
}

