import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function PaymentHistory() {
  const user = auth.currentUser;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function load() {
      const ref = collection(db, "users", user.uid, "payments");
      const snap = await getDocs(ref);

      setPayments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    load();
  }, [user]);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 rounded-xl">
        <h1 className="text-3xl font-semibold mb-6">Payment History</h1>

        {payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <ul className="space-y-4">
            {payments.map((p) => (
              <li
                key={p.id}
                className="p-4 bg-gray-50 rounded-xl shadow-sm flex justify-between"
              >
                <span>{p.description}</span>
                <span className="font-semibold">£{p.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
