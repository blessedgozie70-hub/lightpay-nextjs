
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    setMessage(
      "If an account exists for this email, reset instructions would be sent. Email delivery is not connected in this prototype."
    );
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "420px",
          margin: "40px auto",
          padding: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>LightPay</h1>
        <h2>Forgot your password?</h2>
        <p>Enter your email address to continue.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            disabled={loading}
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              margin: "8px 0 16px",
            }}
          />

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#1646a0",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Processing..." : "Reset password"}
          </button>
        </form>

        <p>
          <Link href="/login">Back to login</Link>
        </p>

        <p>Email delivery is not connected in this prototype.</p>
      </main>
    </>
  );
}
