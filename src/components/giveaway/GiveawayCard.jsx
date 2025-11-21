import React from "react";

export default function GiveawayCard({ title, image, odds, prize, price }) {
  async function handleBuyTicket() {
    try {
      const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, title }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong creating the payment session.");
    }
  }

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 bg-gray-900 text-gray-200 space-y-2">
        <p className="text-sm">
          Prize: <span className="font-medium">{prize}</span>
        </p>

        <p className="text-sm">
          Odds: <span className="font-medium">{odds}</span>
        </p>

        <p className="text-sm">
          Price: <span className="font-medium">£{price}</span>
        </p>

        <button
          onClick={handleBuyTicket}
          className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
}
