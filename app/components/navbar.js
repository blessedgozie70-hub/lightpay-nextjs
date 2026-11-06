import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      padding: "16px",
      borderBottom: "1px solid #ddd",
      marginBottom: "24px",
    }}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/notifications">Notifications</Link>
      <Link href="/ssg">SSG</Link>
      <Link href="/ssr">SSR</Link>
    </nav>
  );
}
