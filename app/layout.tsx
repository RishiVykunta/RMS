import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RailConnect | Professional Railway Reservations",
  description: "Modern railway reservation system providing a seamless travel experience.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-gray-900 min-h-screen flex flex-col pt-20`}>
        <Navbar user={user} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
