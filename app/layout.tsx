import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

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

export const metadata: Metadata = {
  title: {
    default: "GitHub Dashboard Pro",
    template: "%s | GitHub Dashboard Pro",
  },
  description: "A modern dashboard for exploring GitHub profiles, repositories, and contributions.",
  openGraph: {
    title: "GitHub Dashboard Pro",
    description: "A modern dashboard for exploring GitHub profiles, repositories, and contributions.",
    siteName: "GitHub Dashboard Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Dashboard Pro",
    description: "A modern dashboard for exploring GitHub profiles, repositories, and contributions.",
  },
};

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('github-dashboard-theme');
      if (theme === 'light' || theme === 'dark') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
