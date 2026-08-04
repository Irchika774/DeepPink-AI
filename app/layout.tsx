import "./globals.css";
import { Outfit } from "next/font/google";
import { AppContextProvider } from "../context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PinkSeek – Your AI Bestie ✨",
  description:
    "PinkSeek is your friendly, girly AI chat companion powered by DeepSeek AI. Ask anything, get beautiful answers.",
  keywords: ["AI", "chat", "PinkSeek", "DeepSeek", "assistant"],
  openGraph: {
    title: "PinkSeek – Your AI Bestie ✨",
    description: "Chat with PinkSeek, your sweet AI companion",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.variable} antialiased`} style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
