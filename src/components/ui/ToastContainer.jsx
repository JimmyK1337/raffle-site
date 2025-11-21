import React from "react";
import { useToast } from "../../context/ToastContext";

export default function ToastContainer() {
  const { toasts } = useToast();

  if (!toasts) return null; // Prevents crash if undefined

  return (
    <div className="fixed top-5 right-5 space-y-4 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg text-white animate-fadeIn 
            ${toast.type === "success" ? "bg-green-500" : ""}
            ${toast.type === "error" ? "bg-red-500" : ""}
            ${toast.type === "info" ? "bg-blue-500" : ""}
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
