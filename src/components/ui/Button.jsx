export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl font-semibold transition bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow hover:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
