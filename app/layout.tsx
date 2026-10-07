import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "secgrep: Offline Secret Scanner for Git (SecretGuard)",
  description:
    "Catch secrets before commit and in CI. Explainable confidence, historical exposure detection, and rotate-first remediation.",
  keywords: [
    "secret scanner",
    "git security",
    "pre-commit",
    "secret exposure",
    "rust cli",
    "gitleaks alternative",
    "devsecops",
  ],
  authors: [{ name: "HR-Shekhar" }],
  openGraph: {
    title: "secgrep: Offline Secret Scanner for Git (SecretGuard)",
    description:
      "Catch secrets before commit and in CI. Explainable confidence, historical exposure detection, and rotate-first remediation.",
    url: "https://github.com/HR-Shekhar/secgrep",
    siteName: "secgrep",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "secgrep: Offline Secret Scanner for Git (SecretGuard)",
    description:
      "Catch secrets before commit and in CI. Explainable confidence, historical exposure detection, and rotate-first remediation.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-white text-[#09090b] antialiased font-sans selection:bg-[#16a34a]/20 selection:text-black">
        {children}
      </body>
    </html>
  );
}
