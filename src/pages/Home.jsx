import React from "react";
import { Link } from "react-router-dom";
import TopBanner from "../components/layout/TopBanner";
import FeaturedGiveaways from "../components/giveaway/FeaturedGiveaways";
import AnimatedButton from "../components/layout/AnimatedButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <TopBanner />

      {/* Hero Section */}
      <div className="relative pt-24 pb-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fadeInDown">
            Win Big. Win Often.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fadeIn">
            Join raffles for gaming gear, consoles, Pokémon cards, and more — all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/raffles">
              <AnimatedButton>View Giveaways</AnimatedButton>
            </Link>
            <Link to="/login">
              <AnimatedButton>Get Started</AnimatedButton>
            </Link>
          </div>
        </div>

        {/* Animated background / decorative gaming style shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-400 opacity-30 rounded-full mix-blend-multiply animate-blob"></div>
          <div className="absolute top-10 right-1/3 w-80 h-80 bg-blue-400 opacity-30 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-400 opacity-30 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Featured Giveaways */}
      <FeaturedGiveaways />
    </div>
  );
}
