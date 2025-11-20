export default function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition border border-gray-100">
      {children}
    </div>
  );
}
