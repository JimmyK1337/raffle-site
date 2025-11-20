import React, { useState, useEffect, useRef } from "react";

// A dropdown menu with a gaming giveaway-style banner
export default function TopBanner() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 relative">
        {/* Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-2 bg-indigo-900 bg-opacity-80 hover:bg-opacity-100 rounded-md transition focus:outline-none"
          >
            Giveaways ▼
          </button>
          {open && (
            <div className="absolute mt-2 w-60 bg-white text-gray-900 rounded-md shadow-xl overflow-hidden animate-fadeIn">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                  Sealed Pokémon Packs
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                  Raw Pokémon Cards
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                  Graded Pokémon Cards
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Logo / Title */}
        <h1 className="text-2xl font-bold tracking-tight drop-shadow-lg">
          RaffleDex
        </h1>
      </div>
    </header>
  );
}
