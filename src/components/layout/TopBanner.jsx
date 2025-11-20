import React, { useState } from "react";

export default function TopBanner() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LEFT SIDE — DROPDOWN MENU */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition"
          >
            Giveaways ▼
          </button>

          {/* Dropdown Box */}
          {open && (
            <div className="absolute mt-2 w-56 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              <ul className="flex flex-col text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sealed Pokémon Packs
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Raw Pokémon Cards
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Graded Pokémon Cards
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — LOGO OR TITLE */}
        <h1 className="text-lg font-semibold tracking-wide">RaffleDex</h1>
      </div>
    </header>
  );
}
