import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "LightPay | Payments made clearer",
  description: "A modern digital payments experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
