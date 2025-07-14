import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserratFont = Montserrat();

export const metadata: Metadata = {
  title: "Todo",
  description: "Best Todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={montserratFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
