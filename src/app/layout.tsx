import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import DefaultLayout from "@/components/Sidebar/DefaultLayout";
import { cookies } from "next/headers";
import { LoginForm } from "./auth/login/login";
import SignUpForm from "./auth/login/register";
import { Toaster } from "@/components/ui/toaster";
import AuthLogin from "./auth/login/auth-login";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PKMU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const authCookies = cookieStore.get("spbe-auth-cookies");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {authCookies ? (
            <DefaultLayout>{children}</DefaultLayout>
          ) : (
            <AuthLogin />
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
