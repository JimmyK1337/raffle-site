import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleReset(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h1>

        {!sent ? (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-center text-green-600 font-semibold">
            ✔ Reset link sent! Check your inbox.
          </p>
        )}

        <p className="text-center mt-4">
          <Link to="/login" className="text-blue-600">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
