import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinical Staffing AI - Healthcare Recruitment Platform",
  description: "Revolutionary AI-powered healthcare staffing platform that automates credential verification, job matching, and placement workflows",
  keywords: ["healthcare staffing", "medical recruitment", "AI", "credential verification", "job matching"],
  authors: [{ name: "Clinical Staffing AI" }],
  openGraph: {
    title: "Clinical Staffing AI",
    description: "Transform healthcare staffing with AI-powered automation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
