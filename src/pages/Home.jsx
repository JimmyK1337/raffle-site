import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRaffles } from "../firebase/raffleService";
import RaffleGrid from "../components/raffle/RaffleGrid";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";

export default function Home() {
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    getAllRaffles().then(setRaffles);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Win Life-Changing Prizes With <span className="text-yellow-300">RaffleX</span>
            </h1>

            <p className="mt-4 text-lg opacity-90">
              Join thousands of players entering safe, secure online raffles.
              Every ticket brings you closer to amazing rewards.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link to="/raffles">
                <Button className="text-lg px-6 py-3 rounded-2xl">
                  Explore Raffles
                </Button>
              </Link>

              <Link to="/register">
                <Button className="text-lg px-6 py-3 border-white border bg-white text-purple-700 rounded-2xl hover:bg-gray-200">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Featured Raffles */}
      <PageContainer>
        <h2 className="text-3xl font-bold text-center mt-16 mb-8">
          Featured Raffles
        </h2>

        {raffles.length > 0 ? (
          <RaffleGrid raffles={raffles.slice(0, 3)} />
        ) : (
          <p className="text-center text-gray-500">Loading raffles...</p>
        )}

        <div className="flex justify-center mt-10">
          <Link to="/raffles">
            <Button className="px-6 py-3 text-lg rounded-xl">
              View All Raffles
            </Button>
          </Link>
        </div>
      </PageContainer>

      {/* Info Section */}
      <section className="mt-20 bg-gray-50 py-16">
        <PageContainer>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="p-6 bg-white shadow rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">🎉 Weekly Prizes</h3>
              <p className="text-gray-600">New raffles launched every single week.</p>
            </div>

            <div className="p-6 bg-white shadow rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">🔒 Secure & Fair</h3>
              <p className="text-gray-600">Every ticket entry is processed securely.</p>
            </div>

            <div className="p-6 bg-white shadow rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">💳 Easy Payments</h3>
              <p className="text-gray-600">Buy tickets in seconds with your device.</p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
