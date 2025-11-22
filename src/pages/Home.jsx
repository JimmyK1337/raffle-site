import React from "react";
import { Link } from "react-router-dom";
import GiveawayCard from "../components/giveaway/GiveawayCard";

export default function Home() {
  // Dummy raffles
  const dummyRaffles = [
    {
      id: "ps5-raffle",
      title: "PlayStation 5 Giveaway",
      image: "https://i.imgur.com/5bXKM1F.jpg",
      odds: "1 in 200",
      prize: "PlayStation 5 Console",
      price: 5.0,
    },
    {
      id: "switch-raffle",
      title: "Nintendo Switch Raffle",
      image: "https://i.imgur.com/8cM5eZ7.jpg",
      odds: "1 in 150",
      prize: "Nintendo Switch Console",
      price: 3.5,
    },
    {
      id: "xbox-raffle",
      title: "Xbox Series X Raffle",
      image: "https://i.imgur.com/1LZxj4f.jpg",
      odds: "1 in 180",
      prize: "Xbox Series X Console",
      price: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Win Big. Win Often.
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Join raffles for gaming gear, consoles, Pokémon cards, and more!
        </p>
        <Link
          to="/cart"
          className="inline-block mt-4 py-2 px-6 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold"
        >
          View Cart
        </Link>
      </div>

      {/* Raffle Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {dummyRaffles.map((raffle) => (
          <GiveawayCard
            key={raffle.id}
            id={raffle.id}
            title={raffle.title}
            image={raffle.image}
            odds={raffle.odds}
            prize={raffle.prize}
            price={raffle.price}
          />
        ))}
      </div>
    </div>
  );
}
