import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Stratabin | From Thinking to Doing",
  description: "See your thinking as a map, write the plan, schedule and do the work—use STRAB from the dashboard or inside each project. guide.stratabin.com for the full story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
