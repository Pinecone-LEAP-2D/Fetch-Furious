import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { UserProvider } from "@/provider/UserProvider";
import { ProfileProvider } from "@/provider/ProfileProvider";
import { BankCardProvider } from "@/provider/BankCardProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy me Coffee",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <ThemeProvider>
            <UserProvider>
              <ProfileProvider>
                <BankCardProvider>
                  {children}
                  <Toaster />
                </BankCardProvider>
              </ProfileProvider>
            </UserProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
