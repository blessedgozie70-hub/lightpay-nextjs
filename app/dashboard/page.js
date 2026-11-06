import Link from "next/link";

export default function DashboardPage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Welcome to LightPay Dashboard</h1>

      <p>
        Your account dashboard is ready. Manage your payments and explore LightPay.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginTop: "32px",
        }}
      >
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h2>My Wallet</h2>
          <p>View your wallet information.</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h2>Transactions</h2>
          <p>View your payment history.</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h2>Account Settings</h2>
          <p>Manage your account details.</p>
        </div>
      </section>

      <p style={{ marginTop: "32px" }}>
        <Link href="/login">Return to Login</Link>
      </p>

      <p style={{ color: "#666", fontSize: "14px" }}>
        Prototype only — wallet and transaction features are not connected.
      </p>
    </main>
  );
}
