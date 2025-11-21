import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function LiveRaffles() {
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    const ref = collection(db, "raffles");
    const unsub = onSnapshot(ref, (snap) => {
      setRaffles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Live Raffle Tracking</h1>

        {raffles.map((r) => {
          const percent = Math.round((r.ticketsSold / r.ticketsTotal) * 100);

          return (
            <div
              key={r.id}
              className="bg-white p-6 rounded-xl shadow-md space-y-2"
            >
              <h2 className="text-xl font-bold">{r.title}</h2>

              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: percent + "%" }}
                />
              </div>

              <p className="text-gray-600">
                {r.ticketsSold}/{r.ticketsTotal} tickets sold ({percent}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}