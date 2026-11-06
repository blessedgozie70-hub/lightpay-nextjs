"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "40px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>LightPay</h1>
      <h2>Log in to your account</h2>
      <p>Welcome back to LightPay.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px", margin: "8px 0 16px" }} />

        <label htmlFor="password">Password</label>
        <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px", margin: "8px 0" }} />

        <label>
          <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} disabled={loading} />
          {" "}Show password
        </label>

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", marginTop: "16px", background: "#1646a0", color: "white", border: "none", borderRadius: "6px" }}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p>Don't have an account? <Link href="/register">Create an account</Link></p>
      <p><Link href="/forgot-password">Forgot password?</Link></p>
    </main>
  );
}
