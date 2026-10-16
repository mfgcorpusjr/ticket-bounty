import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import NavBar from "@/components/NavBar";
import Container from "@/components/Container";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticket Bounty",
  description: "Tickets by everyone at one place",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body>
        <NavBar />

        <Container className="py-24">{children}</Container>
      </body>
    </html>
  );
}
