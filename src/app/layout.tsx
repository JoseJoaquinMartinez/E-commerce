import type { Metadata } from "next";
import { titleFont } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "An online store for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titleFont.className} antialiased`}>{children}</body>
    </html>
  );
}
