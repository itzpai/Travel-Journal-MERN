import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEntry from "./pages/CreateEntry";
import EntryDetail from "./pages/EntryDetail";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEntry />
              </ProtectedRoute>
            }
          />
          <Route path="/entry/:id" element={<EntryDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
