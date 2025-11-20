import React from "react";

export default function AnimatedButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow-lg transform transition hover:scale-105 active:scale-95 focus:outline-none animate-pulse-slow"
    >
      {children}
    </button>
  );
}
