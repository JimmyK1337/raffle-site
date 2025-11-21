import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  async function handleSave(e) {
    e.preventDefault();

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      navigate("/account");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 flex justify-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>

        <form className="space-y-4" onSubmit={handleSave}>
          <input
            type="text"
            value={name}
            placeholder="Display Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            value={photo}
            placeholder="Photo URL"
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
