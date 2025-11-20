import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../ui/Button";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="w-full py-4 bg-white shadow-md flex justify-between px-6 items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        RaffleX
      </Link>

      {/* Links */}
      <div className="flex gap-6 items-center text-gray-700">

        <Link to="/raffles" className="hover:text-indigo-600 transition">
          Raffles
        </Link>

        {user ? (
          <>
            <Link to="/admin" className="hover:text-indigo-600 transition">
              Admin
            </Link>

            <Button onClick={() => signOut(auth)} className="px-3 py-1">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-600 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-indigo-600 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
