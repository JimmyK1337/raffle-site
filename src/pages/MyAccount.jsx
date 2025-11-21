import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function MyAccount() {
  const [user] = useAuthState(auth);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-2xl animate-fadeIn">
        <div className="flex items-center gap-6">
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
            }
            alt="avatar"
            className="w-20 h-20 rounded-full shadow-md"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {user.displayName || "User"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Link
            to="/"
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-xl font-semibold"
          >
            🏠 Back to Home
          </Link>

          <button
            onClick={() => auth.signOut()}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
