// src/App.jsx
import { Route, Routes } from "react-router-dom";
import IslamicQA from "./pages/IslamicQA";
import Quran from "./pages/Quran";
import Home from "./Home";
import AsmaUlHusna from "./pages/AsmaulHusna";
import HadithOfTheDay from "./pages/HadithoftheDay";
import Navbar from "./components/Navbar";
// import "./App.css"; // still usable for custom styles

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qa" element={<IslamicQA />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/daily-dua" element={<AsmaUlHusna />} />
            <Route path="/hadith-of-the-day" element={<HadithOfTheDay />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
