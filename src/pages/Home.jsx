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
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        color: "#fff",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          letterSpacing: "3px",
          textShadow: "2px 2px #ff6a95",
        }}
      >
        RaffleDex 🎉
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          color: "#fff",
          marginBottom: "2rem",
          maxWidth: "700px",
          textShadow: "1px 1px #ff6a95",
        }}
      >
        Welcome to RaffleDex! Your one-stop fun zone for raffles and prizes. Start exploring and grab your lucky ticket!
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/login"
          style={{
            padding: "1rem 2rem",
            background: "linear-gradient(45deg, #ff6a95, #ffb347)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            padding: "1rem 2rem",
            background: "linear-gradient(45deg, #6a11cb, #2575fc)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
