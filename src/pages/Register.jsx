import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user.user, { displayName });

      navigate("/account");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Display Name"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transform hover:scale-[1.02] transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
