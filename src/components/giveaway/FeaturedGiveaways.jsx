// src/components/giveaway/FeaturedGiveaways.jsx
import React from "react";
import GiveawayCard from "./GiveawayCard";

const sampleGiveaways = [
  {
    title: "Gaming PC Ultra 4080",
    image: "https://via.placeholder.com/400x300?text=Gaming+PC",
    odds: "1 in 5000",
    prize: "RTX 4080 Gaming PC",
    price: 5, // ticket price in GBP
  },
  {
    title: "Nintendo Switch OLED",
    image: "https://via.placeholder.com/400x300?text=Switch+OLED",
    odds: "1 in 20000",
    prize: "Switch OLED + Games",
    price: 2,
  },
  {
    title: "Pokémon Booster Box",
    image: "https://via.placeholder.com/400x300?text=Pokémon+Box",
    odds: "1 in 8000",
    prize: "Sealed Pokémon Box",
    price: 3,
  },
];

export default function FeaturedGiveaways() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Featured Giveaways
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleGiveaways.map((g, idx) => (
          <GiveawayCard
            key={idx}
            title={g.title}
            image={g.image}
            odds={g.odds}
            prize={g.prize}
            price={g.price} // pass price
          />
        ))}
      </div>
    </section>
  );
}
