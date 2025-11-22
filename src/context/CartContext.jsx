import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user] = useAuthState(auth);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    async function loadCart() {
      const cartRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(cartRef);

      if (snapshot.exists()) {
        setCart(snapshot.data().cart || []);
      } else {
        setCart([]);
      }
    }

    loadCart();
  }, [user]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "users", user.uid);
    setDoc(cartRef, { cart }, { merge: true });
  }, [cart, user]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Number(quantity) } : i))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
