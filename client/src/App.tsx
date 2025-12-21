import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEntry from "./pages/CreateEntry";
import EntryDetail from "./pages/EntryDetail";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEntry />} />
            <Route path="/entry/:id" element={<EntryDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
