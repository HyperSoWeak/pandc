import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "114 P&C 銜接課程調查表",
  description: "114 P&C 銜接課程調查表",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
