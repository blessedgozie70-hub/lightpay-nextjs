"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim() },
        },
      });

      if (error) throw error;

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setMessage("Account created. Please check your email to confirm your account before logging in.");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "40px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>LightPay</h1>
      <h2>Create your account</h2>
      <p>Join LightPay to get started.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input id="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px", margin: "8px 0 16px" }} />

        <label htmlFor="email">Email address</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px", margin: "8px 0 16px" }} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px", margin: "8px 0 16px" }} />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px", margin: "8px 0 16px" }} />

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        {message && <p role="status">{message}</p>}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: "#1646a0", color: "white", border: "none", borderRadius: "6px" }}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p>Already have an account? <Link href="/login">Log in</Link></p>
    </main>
  );
}
