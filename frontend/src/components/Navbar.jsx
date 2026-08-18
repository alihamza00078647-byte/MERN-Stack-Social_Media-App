import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";

export function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="hidden md:inline font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SocialHub
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-sm mx-8">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search posts, people..."
            className="bg-transparent ml-2 outline-none w-full text-sm placeholder-gray-500"
          />
        </div>

        {/* Desktop Nav Links & Auth */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
            <button className="px-6 py-2 rounded-full border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Sign Up
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent ml-2 outline-none w-full text-sm placeholder-gray-500"
              />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="p-4 flex flex-col gap-2">
            <button className="w-full px-4 py-2 rounded-full border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Sign Up
            </button>
            <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
