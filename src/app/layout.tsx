import type { Metadata } from "next";
import "./globals.css";
import { version as versionNumber } from "../../package.json";

export const metadata: Metadata = {
  title: "App store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="app-version" className="hidden">
          {versionNumber}
        </div>
      </body>
    </html>
  );
}
