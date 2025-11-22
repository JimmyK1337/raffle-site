import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Menu } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-blue-600 hover:opacity-75 transition">
        RaffleDex
      </Link>

      {!user && (
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
          <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
        </div>
      )}

      {user && (
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-8 h-8 text-gray-700 hover:text-gray-900" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>

          <Menu as="div" className="relative">
            <Menu.Button>
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                }
                className="w-10 h-10 rounded-full cursor-pointer border shadow-sm hover:opacity-90 transition"
                alt="profile"
              />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl p-2 text-gray-800 animate-fadeIn z-50">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/account"
                    className={`${active ? "bg-gray-100" : ""} block px-4 py-2 rounded-md`}
                  >
                    My Account
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/edit-profile"
                    className={`${active ? "bg-gray-100" : ""} block px-4 py-2 rounded-md`}
                  >
                    Edit Profile
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/payment-history"
                    className={`${active ? "bg-gray-100" : ""} block px-4 py-2 rounded-md`}
                  >
                    Payment History
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/live-raffles"
                    className={`${active ? "bg-gray-100" : ""} block px-4 py-2 rounded-md`}
                  >
                    Live Raffles
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => auth.signOut()}
                    className={`${active ? "bg-red-100" : ""} w-full text-left px-4 py-2 rounded-md text-red-600`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      )}
    </nav>
  );
}
