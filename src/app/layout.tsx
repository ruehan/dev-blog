"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import RootLayout from "../components/RootLayout";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Dev Blog",
//   description: "A blog about development and technology",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers attribute="class" defaultTheme="system" enableSystem>
        <RootLayout>{children}</RootLayout>
      </Providers>
      </body>
      </html>
  );
}