import type { Metadata } from "next";
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "My-Code-Snippets",
  description: "My-Code-Snippets",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
