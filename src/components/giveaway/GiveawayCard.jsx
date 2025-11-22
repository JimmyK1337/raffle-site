import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";

/**
 * GiveawayCard
 * Props: id, title, image, odds, prize, price (number, GBP)
 */
export default function GiveawayCard({ id, title, image, odds, prize, price }) {
  const { addToCart } = useCart();
  const [user] = useAuthState(auth); // Get logged-in user

  const safeId = id ?? title.replace(/\s+/g, "-").toLowerCase();

  const handleAddToCart = () => {
    addToCart({
      id: safeId,
      title,
      price: Number(price),
      image,
    });
  };

  // Buy Now -> create a one-item checkout session (quick buy)
  async function handleBuyNow() {
    if (!user) return alert("Please log in to buy this item.");

    try {
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{ id: safeId, title, price: Number(price), quantity: 1 }],
          uid: user.uid, // send uid to backend
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (err) {
      console.error("BuyNow error", err);
      alert("Error initiating payment.");
    }
  }

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-gray-200 space-y-2">
        <p className="text-sm">
          Prize: <span className="font-medium">{prize}</span>
        </p>

        <p className="text-sm">
          Odds: <span className="font-medium">{odds}</span>
        </p>

        <p className="text-sm">
          Price: <span className="font-medium">£{Number(price).toFixed(2)}</span>
        </p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
