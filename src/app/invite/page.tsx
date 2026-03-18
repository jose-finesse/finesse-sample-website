"use client";

import Image from "next/image";
import { useState } from "react";

export default function InvitePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    instagram: "",
    plusOne: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Flyer */}
      <div style={{ width: "100%", maxWidth: "420px", padding: "16px 16px 0" }}>
        <Image
          src="/flyer.jpg"
          alt="Finesse Sample Sale — March 20th 2026"
          width={2000}
          height={2500}
          style={{ width: "100%", height: "auto", borderRadius: "4px" }}
          priority
        />
      </div>

      {/* Content */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "24px 16px 48px",
        }}
      >
        {!submitted ? (
          <>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              You're Invited
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#999",
                lineHeight: 1.5,
                marginBottom: "28px",
              }}
            >
              Private view of the Finesse archive. Friday, March 20th from 3PM
              to 8PM. 700 S Flower St, 18th Floor, DTLA. Welcome cocktail,
              live music. Jose Peon will be shooting lookbook, come ready to be
              captured. Limited spots.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  maxLength={100}
                  autoComplete="off"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Instagram handle"
                  value={form.instagram}
                  onChange={(e) =>
                    setForm({ ...form, instagram: e.target.value })
                  }
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Plus one name (optional)"
                  value={form.plusOne}
                  onChange={(e) =>
                    setForm({ ...form, plusOne: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "14px",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  fontFamily: "inherit",
                }}
              >
                {loading ? "..." : "RSVP"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              You're on the list
            </h1>
            <p style={{ fontSize: "14px", color: "#999", lineHeight: 1.5 }}>
              Friday, March 20th. 3PM. 18th Floor.
              <br />
              See you there.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "transparent",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};
