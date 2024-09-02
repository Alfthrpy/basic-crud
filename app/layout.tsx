import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-3xl mx-auto text-slate-800">
          <header className="p-6 border-b flex items-center justify-between bg-blue-500 rounded-bl-lg rounded-br-lg">
            <Link href={'/'} className="text-2xl font-bold text-white">Istilah di Mobile Legend</Link>
            <Link href={'/create'} className="bg-slate-100 grid place-items-center py-2 px-2 rounded-full font-bold shadow-md">Tambah Istilah</Link>
          </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}
