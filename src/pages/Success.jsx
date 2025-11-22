import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // clear cart after successful payment
    if (auth.currentUser) {
      navigate("/cart", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your tickets have been added to your account.
        </p>
        <button
          onClick={() => navigate("/")}
          className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
        >
          Back to Giveaways
        </button>
      </div>
    </div>
  );
}
