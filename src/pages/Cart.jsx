import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Cart() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth); // Get the logged-in user

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    if (!user) return alert("Please log in to checkout.");
    if (cart.length === 0) return alert("Your cart is empty.");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, uid: user.uid }), // send uid to backend
      });

      const data = await res.json();

      if (data.url) {
        // Optionally clear cart here to prevent double purchases
        // clearCart();
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (err) {
      console.error("checkout error", err);
      alert("There was an error creating the checkout session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/" className="text-blue-600 font-semibold">
              Back to Giveaways
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl mb-2 shadow flex items-center gap-4"
              >
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="text-sm text-gray-600">£{item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="w-20 p-2 border rounded"
                  />

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <p className="text-gray-600">Total</p>
                <p className="text-2xl font-bold">£{total.toFixed(2)}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => clearCart()}
                  className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Clear
                </button>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="py-3 px-6 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold"
                >
                  {loading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
