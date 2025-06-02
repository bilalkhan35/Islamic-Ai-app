import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo (Right for RTL look) */}
        <Link
          to="/"
          className="text-xl font-semibold text-emerald-700 tracking-wider"
        >
          Islamic AI
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 rtl:space-x-reverse text-sm font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-emerald-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/quran" className="hover:text-emerald-600 transition">
              Quran
            </Link>
          </li>
          <li>
            <Link to="/daily-dua" className="hover:text-emerald-600 transition">
              AsmaUlHusna
            </Link>
          </li>
          <li>
            <Link
              to="/hadith-of-the-day"
              className="hover:text-emerald-600 transition"
            >
              Hadith
            </Link>
          </li>
          <li>
            <Link to="/qa" className="hover:text-emerald-600 transition">
              Islamic Q&A
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-emerald-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-white shadow-inner px-6 pb-4 space-y-3 text-gray-700 text-sm">
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="block py-1 hover:text-emerald-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/quran"
              onClick={closeMenu}
              className="block py-1 hover:text-emerald-600"
            >
              Quran
            </Link>
          </li>
          <li>
            <Link
              to="/daily-dua"
              onClick={closeMenu}
              className="block py-1 hover:text-emerald-600"
            >
              AsmaUlHusna
            </Link>
          </li>
          <li>
            <Link
              to="/hadith-of-the-day"
              onClick={closeMenu}
              className="block py-1 hover:text-emerald-600"
            >
              Hadith
            </Link>
          </li>
          <li>
            <Link
              to="/qa"
              onClick={closeMenu}
              className="block py-1 hover:text-emerald-600"
            >
              Islamic Q&A
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
