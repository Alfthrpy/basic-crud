import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basic CRUD MLBB TERM",
  description: "by : alfthrpy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div className="max-w-3xl mx-auto text-slate-800">
          <header className="p-4 md:p-6 border-b flex items-center justify-between bg-blue-500 rounded-bl-lg rounded-br-lg">
            <Link href="/" className="text-xl md:text-2xl font-bold text-white">
              Istilah di Mobile Legend
            </Link>
            <Link
          href="/create"
          className="bg-slate-100 grid place-items-center py-2 px-2 md:px-4 rounded-full font-bold shadow-md text-xs md:text-base"
        >
          Tambah Istilah
        </Link>
          </header>
          <main className="p-4 md:text-lg text-base">{children}</main>
        </div>
      </body>
    </html>
  );
}
