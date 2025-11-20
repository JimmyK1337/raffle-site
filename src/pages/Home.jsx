import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#333",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          letterSpacing: "2px",
        }}
      >
        RaffleDex
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#666",
          maxWidth: "600px",
          marginBottom: "2rem",
        }}
      >
        Welcome! This is a minimalistic placeholder Home page for your raffle
        website. You can start designing your raffles here.
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/login"
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#333",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#fff",
            color: "#333",
            border: "2px solid #333",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
